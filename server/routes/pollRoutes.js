const express = require('express')
const keys = require('../config/keys')

const redis = require('redis')
const redisUrl = keys.redisURL
const redisClient = redis.createClient(redisUrl)
const redisExpiryTime = 60 // in seconds
const util = require('util')
redisClient.hget = util.promisify(redisClient.hget)

const requireLogin = require('../middlewares/requireLogin')
const Poll = require('../models/Poll')

const poll = express.Router()

// Helper function for getting the Mongoose query depending on whether user is getting personal polls or all polls
const determineQuery = req =>
	req.path === '/all_polls'
		? Poll.find({})
		: Poll.find({ userID: req.params.id })

// Request handler for getting polls
const findData = (req, res) => {
	let findQuery = determineQuery(req)

	const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
	let limit = req.query.limit ? parseInt(req.query.limit, 10) : 20
	if (limit > 50) limit = 50

	const redisCacheKey = JSON.stringify({
		...findQuery
			.sort({ _id: -1 })
			.skip(offset)
			.limit(limit)
			.getOptions(),
		path: req.path,
	})

	const getCountFromRedis = redisClient.hget(redisCacheKey, 'polls')
	const getPollsFromRedis = redisClient.hget(redisCacheKey, 'count')

	Promise.all([getCountFromRedis, getPollsFromRedis])
		.then(result => {
			if (result[0]) {
				console.log('sent from cache')
				const parsedPolls = JSON.parse(result[0]).map(o => JSON.parse(o))
				res.json({
					count: result[1],
					polls: parsedPolls,
				})
			} else {
				return Promise.reject()
			}
		})
		.catch(() => {
			let totalCount

			findQuery = determineQuery(req)

			const count = findQuery.countDocuments().then(result => {
				totalCount = result
			})

			findQuery = determineQuery(req)

			const data = findQuery
				.sort({ _id: -1 })
				.skip(offset)
				.limit(limit)
				.then(polls =>
					polls.map(poll => ({
						id: poll._id,
						pollQuestion: poll.pollQuestion,
					}))
				)

			Promise.all([count, data]).then(result => {
				console.log('sent from server')
				redisClient.hset(
					redisCacheKey,
					'count',
					totalCount,
					'EX',
					redisExpiryTime
				)
				redisClient.hset(
					redisCacheKey,
					'polls',
					JSON.stringify(result[1].map(o => JSON.stringify(o))),
					'EX',
					redisExpiryTime
				)
				res.json({
					count: totalCount,
					polls: result[1],
				})
			})
		})
}

// Submit poll
poll.post('/submit', requireLogin, (req, res) => {
	Poll.findOne({
		userID: req.body.userID,
		pollQuestion: req.body.pollQuestion,
	}).then(foundPoll => {
		if (foundPoll) {
			res.status(406).send('failed')
		} else {
			redisClient.flushall()
			new Poll(req.body).save().then(savedPoll => res.send(savedPoll._id))
		}
	})
})

poll.get('/get_poll/:id', (req, res) => {
	Poll.findById(req.params.id).then(poll => res.send(poll))
})

poll.get('/get_user_polls/:id', requireLogin, findData)

poll.get('/all_polls', findData)

poll.put('/vote', (req, res) => {
	if (req.body.selection === "I'd like a custom option") {
		Poll.findOneAndUpdate(
			{
				_id: req.body.id,
				'pollOptions.name': { $ne: req.body.customSelection },
				IP: { $ne: req.clientIp },
			},
			{
				$addToSet: {
					pollOptions: {
						name: req.body.customSelection,
						quantity: 1,
					},
				},
				$push: {
					IP: req.clientIP,
				},
			},
			{ new: true }
		)
			.then(updatedPoll => {
				updatedPoll ? res.send(updatedPoll) : res.status(304).send(updatedPoll)
			})
			.catch(err => res.send(err))
	} else {
		Poll.findOneAndUpdate(
			{
				_id: req.body.id,
				pollOptions: {
					$elemMatch: { name: req.body.selection },
				},
				IP: { $ne: req.clientIp },
			},
			{
				$inc: { 'pollOptions.$.quantity': 1 },
				$push: {
					IP: req.clientIp,
				},
			},
			{ new: true }
		)
			.then(poll => {
				res.send(poll)
			})
			.catch(err => res.send(err))
	}
})

poll.delete('/delete/:id', requireLogin, (req, res) => {
	redisClient.flushall()
	Poll.findByIdAndRemove(req.params.id).then(deletedPoll => {
		if (deletedPoll) res.send({ status: 'ok' })
		else res.send({ status: 'Warning: poll not found' })
	})
})

module.exports = poll

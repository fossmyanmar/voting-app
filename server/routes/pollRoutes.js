const express = require('express')

const requireLogin = require('../middlewares/requireLogin')
const Poll = require('../models/Poll')

const poll = express.Router()

poll.post('/submit', requireLogin, (req, res) => {
	Poll.findOne({
		userID: req.body.userID,
		pollQuestion: req.body.pollQuestion
	}).then(foundPoll => {
		if (foundPoll) {
			res.status(406).send('failed')
		} else {
			new Poll(req.body).save().then(savedPoll => res.send(savedPoll._id))
		}
	})
})

poll.get('/get_poll/:id', (req, res) => {
	Poll.findById(req.params.id).then(poll => res.send(poll))
})

poll.get('/get_user_polls/:id', requireLogin, (req, res) => {
	Poll.find({ userID: req.params.id }).then(polls => {
		res.send(
			polls.map(poll => {
				return {
					id: poll._id,
					pollQuestion: poll.pollQuestion
				}
			})
		)
	})
})

poll.get('/all_polls', (req, res) => {
	Poll.find({}).then(polls =>
		res.send(
			polls.map(poll => {
				return {
					id: poll._id,
					pollQuestion: poll.pollQuestion
				}
			})
		)
	)
})

poll.put('/vote', (req, res) => {
	if (req.body.selection === "I'd like a custom option") {
		Poll.findOneAndUpdate(
			{
				_id: req.body.id,
				'pollOptions.name': { $ne: req.body.customSelection }
			},
			{
				$addToSet: {
					pollOptions: {
						name: req.body.customSelection,
						quantity: 1
					}
				}
			},
			{ new: true }
		)
			.then(updatedPoll => res.status(304).send(updatedPoll))
			.catch(err => res.send(err))
	} else {
		Poll.findOneAndUpdate(
			{
				_id: req.body.id,
				pollOptions: {
					$elemMatch: { name: req.body.selection }
				}
			},
			{ $inc: { 'pollOptions.$.quantity': 1 } },
			{ new: true }
		).then(poll => {
			res.send(poll)
		})
	}
})

module.exports = poll

const express = require('express')
const Poll = require('../models/Poll')

const poll = express.Router()

poll.post('/submit', (req, res) => {
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

module.exports = poll

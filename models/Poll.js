const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
	userID: String,
	pollQuestion: String,
	pollOptions: [
		{
			name: String,
			quantity: Number
		}
	]
})

const Polls = mongoose.model('poll', pollSchema)

module.exports = Polls

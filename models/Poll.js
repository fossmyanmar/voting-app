const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
	profileID: String,
	pollName: String,
	pollOptions: [
		{
			name: String,
			quantity: Number
		}
	]
})

const Polls = mongoose.model('poll', pollSchema)

export default Polls
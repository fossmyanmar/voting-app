const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = require('./Profile')

const userSchema = new Schema({
	profileID: String,
	token: String,
	name: String
})

const Users = mongoose.model('user', userSchema)

module.exports = Users

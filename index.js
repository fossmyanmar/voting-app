const express = require('express')
const mongoose = require('mongoose')

const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, { useMongoClient: true })
mongoose.Promise = global.Promise

const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

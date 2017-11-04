const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

const keys = require('./config/keys')

const auth = require('./routes/authRoutes')

require('./models/User')

mongoose.connect(keys.mongoURI, { useMongoClient: true })
mongoose.Promise = global.Promise

const app = express()

app.use(bodyParser.json())

app.use(
	session({
		secret: keys.cookieKey,
		saveUninitialized: true,
		resave: true
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

const keys = require('./config/keys')

const auth = require('./routes/authRoutes')
const poll = require('./routes/pollRoutes')

require('./models/User')
require('./services/passport')

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
app.use('/poll', poll)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'))
	const path = require('path')
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

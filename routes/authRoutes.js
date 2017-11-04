const passport = require('passport')
const express = require('express')

const auth = express.Router()

auth.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile']
	})
)

auth.get('/google/callback', passport.authenticate('google'), (req, res) => {
	res.redirect('/')
})

auth.get('/facebook', passport.authenticate('facebook'))

auth.get(
	'/facebook/callback',
	passport.authenticate('facebook'),
	(req, res) => {
		res.redirect('/')
	}
)

auth.get('/current_user', (req, res) => {
	res.send(req.user)
})

auth.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = auth

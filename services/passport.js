const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const keys = require('../config/keys')

const User = mongoose.model('user')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleSecretKey,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ profileID: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser)
				} else {
					new User({
						profileID: profile.id,
						name: profile.displayName
					})
						.save()
						.then(user => done(null, user))
				}
			})
		}
	)
)

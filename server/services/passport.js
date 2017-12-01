const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GithubStrategy = require('passport-github').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
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

const login = (accessToken, refreshToken, profile, done) => {
	User.findOne({ profileID: profile.id }).then(existingUser => {
		if (existingUser) {
			done(null, existingUser)
		} else {
			new User({
				profileID: profile.id
			})
				.save()
				.then(user => done(null, user))
		}
	})
}

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleSecretKey,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		login
	)
)

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookSecretKey,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'name'],
			proxy: true
		},
		login
	)
)

passport.use(
	new GithubStrategy(
		{
			clientID: keys.githubClientID,
			clientSecret: keys.githubSecretKey,
			callbackURL: '/auth/github/callback',
			proxy: true
		},
		login
	)
)

passport.use(
	new TwitterStrategy(
		{
			consumerKey: keys.twitterClientID,
			consumerSecret: keys.twitterSecretKey,
			callbackURL: '/auth/twitter/callback',
			proxy: true
		},
		login
	)
)

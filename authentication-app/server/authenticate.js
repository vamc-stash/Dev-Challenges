require('dotenv').config()
const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

const User = require('./models/user')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const FacebookTokenStrategy = require('passport-facebook-token')
const GithubTokenStrategy = require('passport-github-token')
const GoogleTokenStrategy = require('passport-google-token').Strategy
const TwitterTokenStrategy = require('passport-twitter-token')

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
	return jwt.sign(user, `${stage.secretKey}`, {expiresIn: 3600})
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = `${stage.secretKey}`

passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
	console.log('JWT Payload', jwt_payload)
	User.findOne({_id: jwt_payload._id}, (err, user) => {
		if(err) {
			return done(err, false)
		}
		else if(user) {
			return done(null, user)
		}
		else {
			return done(null, false)
		}
	})
}))

exports.verifyUser = passport.authenticate('jwt', {session: false})
exports.verifyAdmin = (req, res, next) => {
	if(req.user.admin) {
		next()
	}
	else {
		var err = new Error('You are not authorized to perform this operation!');
  err.status = 403;
  return next(err);
 }
}

passport.use(new FacebookTokenStrategy({
	clientID: stage.facebook.clientID,
	clientSecret: stage.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({facebookId: profile.id}, (err, user) => {
		if(err) {
			return done(err, false)
		}
		else if(!err && user !== null) {
			return done(null, user)
		}
		else {
			//console.log('FB profile', profile)
			user = new User({username: profile.displayName})
			user.facebookId = profile.id,
			user.save((err, user) => {
				if(err)
					done(err, false)
				else
					done(null,user)
			})
		}
	})
}))

passport.use(new GithubTokenStrategy({
	clientID: stage.github.clientID,
	clientSecret: stage.github.clientSecret
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({githubId: profile.id}, (err, user) => {
		if(err) {
			return done(err, false)
		}
		else if(!err && user !== null) {
			return done(null, user)
		}
		else {
			//console.log('GITHUB profile', profile)
			user = new User({username: profile.displayName})
			user.githubId = profile.id,
			user.save((err, user) => {
				if(err)
					done(err, false)
				else
					done(null,user)
			})
		}
	})
}))

passport.use(new GoogleTokenStrategy({
	clientID: stage.google.clientID,
	clientSecret: stage.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({googleId: profile.id}, (err, user) => {
		if(err) {
			return done(err, false)
		}
		else if(!err && user !== null) {
			return done(null, user)
		}
		else {
			//console.log('GOOGLE profile', profile)
			user = new User({username: profile.displayName})
			user.googleId = profile.id,
			user.save((err, user) => {
				if(err)
					done(err, false)
				else
					done(null,user)
			})
		}
	})
}))

passport.use(new TwitterTokenStrategy({
	consumerKey: stage.twitter.clientID,
	consumerSecret: stage.twitter.clientSecret
}, (token, tokenSecret, profile, done) => {
	User.findOne({twitterId: profile.id}, (err, user) => {
		if(err) {
			return done(err, false)
		}
		else if(!err && user !== null) {
			return done(null, user)
		}
		else {
			//console.log('TWITTER profile', profile)
			user = new User({username: profile.username})
			user.twitterId = profile.id,
			user.save((err, user) => {
				if(err)
					done(err, false)
				else
					done(null,user)
			})
		}
	})
}))
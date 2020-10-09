require('dotenv').config()
const environment = process.env.NODE_ENV
const stage = require('../config')[environment]

var express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
const axios = require('axios')
const authenticate = require('../authenticate')
const cors = require('./cors')

var User = require('../models/user')

var router = express.Router();
router.use(bodyParser.json())

router.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200)})

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	User.find()
	.then((users) => {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.json(users)
	}, (err) => next(err))
	.catch((err) => next(err))
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			res.statusCode = 500
			res.setHeader('Content-Type', 'application/json')
			res.json({err: err})
		}
		else {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json({success: true, status: 'Registration is successful!'})
		}
	})
})

router.post('/login', cors.corsWithOptions, (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err)
		}

		if (!user) {
			res.statusCode = 401
			res.setHeader('Content-Type', 'application/json')
			res.json({success: false, status: 'Login Unsuccessful!', err: info})
		}

		req.logIn(user, (err) => {
			if (err) {
				res.statusCode = 401
				res.setHeader('Content-Type', 'application/json')
				res.json({success: false, status: 'Login Unsuccessful!', err: 'could not login the user :/'})
			}
			else {
				var token = authenticate.getToken({_id: req.user._id})

				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json({success: true, status: 'Login Successful!', token: token})
			}
		})
	}) (req, res, next)
})

router.post('/logout', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
	if (req.user) {
		res.redirect('/')
	}
	else {
		var err = new Error('You are not logged in!')
		err.status = 403
		next(err)
	}
})

router.get('/checkjwtspan', cors.corsWithOptions, (req, res, next) => {
	passport.authenticate('jwt', {session: false}, (err, user, info) => {
		if (err) {
			return next(err)
		}

		if (!user) {
			res.statusCode = 401
			res.setHeader('Content-Type', 'application/json')
			res.json({success: false, status: 'JWT Invalid :(', err: info})
		}
		else {
			res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.json({success: true, status: 'JWT Valid :)', user: user})
		}
	}) (req, res)
})

router.route('/details')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
	User.findById(req.user._id)
	.then((user) => {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.json(user)
	}, err => next(err))
	.catch(err => next(err))
})	
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
	User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true})
	.then((user) => {
		if(req.body.password) {
			//Ideally, it should be user.updatePassword(req.body.oldPassword, req.body.newPassword, () ...)
			user.setPassword(req.body.password, () => { 
				user.save()
				.then((user) => {
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(user)
					console.log('password set successfully')
				})
			})
		}
		else {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(user)
		}
	}, err => next(err))
	.catch(err => next(err))
})

router.get('/google/token', cors.corsWithOptions, passport.authenticate('google-token'), (req, res) => {
	if(req.user) {
		var token = authenticate.getToken({_id: req.user._id})

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, status: 'You are successfully logged in!', user: req.user});
	}
})

router.get('/facebook/token', cors.corsWithOptions, passport.authenticate('facebook-token'), (req, res) => {
	if(req.user) {
		var token = authenticate.getToken({_id: req.user._id})

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, status: 'You are successfully logged in!', user: req.user});
	}
})

router.get('/github/code', cors.corsWithOptions, (req, res, next) => {

	const accessTokenUrl = `https://github.com/login/oauth/access_token?` + 
		'client_id=' + stage.github.clientID +
		'&client_secret=' + stage.github.clientSecret +
		'&code=' + req.query.code

	axios.get(accessTokenUrl)
	.then(res => res.data.split("&")[0].split("=")[1])
	.then(accessToken => {
		req.body['access_token'] = accessToken
		next() 
	})
	.catch(err => next(err))

}, passport.authenticate('github-token'), (req, res) => {
	if(req.user) {
		var token = authenticate.getToken({_id: req.user._id})

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, status: 'You are successfully logged in!', user: req.user});
	}
})
	
router.get('/twitter/token', cors.corsWithOptions, passport.authenticate('twitter-token'), (req, res) => {
	if(req.user) {
		var token = authenticate.getToken({_id: req.user._id})

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, status: 'You are successfully logged in!', user: req.user});
	}
})

module.exports = router;
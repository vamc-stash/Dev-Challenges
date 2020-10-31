var express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
const authenticate = require('../authenticate')
const cors = require('../cors')
const User = require('../models/user')

var router = express.Router();
router.use(bodyParser.json())
router.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200)})

/* GET users listing. */
router.get('/', cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find()
  .then((users) => {
    res.statusCode(200)
    res.setHeader('Content-Type', 'application/json')
    res.json(users)
  }, err => next(err))
  .catch((err) => next(err))
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.json({err: err})
    }
    else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({success: true, status: 'registration is successful'})
    }
  })
})

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      next(err)
    }
    if(!user) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      res.json({success: false, status: 'Login is unsuccessful', err: info})
    }

    req.logIn(user, (err) => {
      if(err) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.json({success: false, status: 'Login is unsuccessful', err: 'failed to login the user, ' + err})
      }
      else {
        var token = authenticate.getToken({_id: req.user._id})

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, status: 'login is successful', token: token})
      }
    })
  })(req, res, next)
})

router.post('/logout', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  req.logOut()
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({success: true, status: 'logout is successful'})
})

router.get('checkjwtspan', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if(err) {
      next(err)
    }
    if(!user) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      res.json({success: false, status: 'JWT is invalid', err: info})
    }
    else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({success: true, status: 'JWT is valid', user: user})
    }
  })(req, res)
})

router.route('/profile')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(user)
  }, err => next(err))
  .catch((err) => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true})
  .then((user) => {
    if(req.body.newPassword) {
      user.changePassword(req.body.oldPassword, req.body.newPassword, (err) => {
        if(err) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({success: false, status: 'password reset is unsuccessful', err: err})
        }
        else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({success: true, status: 'password reset is successful', user: user})
        }
      })
    }
    else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(user)
    }
  }, err => next(err))
  .catch((err) => next(err))
})

module.exports = router;

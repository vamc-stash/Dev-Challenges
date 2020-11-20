const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const stage = require('./config')[process.env.NODE_ENV]
const User = require('./models/user')

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = (user) => {
    return jwt.sign(user, `${stage.secretKey}`, { expiresIn: 3600 })
}

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${stage.secretKey}`
}
passport.use(new JwtStrategy(strategyOptions, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false)
        }
        else if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt', { session: false })

exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        next()
    }
    else {
        var error = new Error('you are not authorized to perform this operation.')
        error.status = 403
        return next(error)
    }
}
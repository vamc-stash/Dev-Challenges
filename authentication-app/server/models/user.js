const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
	name: {
		type: String,
		default: ''
	},
	bio: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	image: {
		data: Buffer,
		ContentType: String,
		default: ''
	},
	facebookId: String,
	githubId: String,
	googleId: String,
	twitterId: String,
	admin: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
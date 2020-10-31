const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
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
        contentType: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false 
    },
    memberOf: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }]
}, {
    timestamps: true
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
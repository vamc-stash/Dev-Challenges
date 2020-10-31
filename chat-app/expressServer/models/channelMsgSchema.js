const mongoose = require('mongoose')
const Schema = mongoose.Schema
const channelMsgSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = channelMsgSchema
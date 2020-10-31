var express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
const authenticate = require('../authenticate')
const cors = require('../cors')
var fs = require('fs')
const inflection = require('inflection')

const mongoose = require('mongoose')
const channelMsgSchema = require('../models/channelMsgSchema')
const User = require('../models/user')
const Channel = require('../models/channel');

var router = express.Router()
router.use(bodyParser.json())
router.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200)})

router.route('/')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.find()
    .then((channels) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, channels: channels})
    }, err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.findOne({name: req.body.name})
    .then((channel) => {
        if(!channel) {
            Channel.create({
                name: req.body.name,
                nameRef: inflection.camelize(req.body.name.trim().split(' ').join('_')),
                description: req.body.description,
                admin: req.user._id,
                members: req.user._id
            })
            .then((channel) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, status: `${channel.name} channel is created successfully`})
            })
        }
        else {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.json({success: false, status: 'channel with the same name already exists'})
        }
    })
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Channel.find()
    .then((channels) => {
        channels.forEach(channel => {
            const ChannelMsgs = mongoose.model(channel.nameRef, channelMsgSchema)
            ChannelMsgs.deleteOne((err, resp) => {
                if(err)
                    next(err)
            })
        })
    }, err => next(err))
    .then((resp) => {
        Channel.deleteMany()
        .then((resp) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(resp)
        }, (err) => next(err))
    })
    
    .catch((err) => next(err))
})

router.route('/:channel/member')
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.findOne({nameRef: req.params.channel})
    .then((channel) => {
        if(channel) {
            if(channel.members.indexOf(req.user._id) === -1) {
                channel.members.push({_id: req.user._id})
            }
            channel.save()
            .then((channel) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, channel: channel})
            }, err => next(err))
        }
        else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({success: false, status: 'channel does not exists'})
        }
    })
    .catch(err => next(err))
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.findOne({nameRef: req.params.channel})
    .then((channel) => {
        if(channel) {
            if(channel.admin._id.equals(req.user._id) && !channel.admin._id.equals(req.body.memberId)) {
                const index = channel.members.indexOf(req.body.memberId)
                if(index > -1) {
                    channel.members.splice(index, 1)
                    channel.save()
                    .then((channel) => {
                        res.statusCode = 401
                        res.setHeader('Content-Type', 'application/json')
                        res.json({success: true, channel: channel})
                    })
                }
            }
            else {
                res.statusCode = 401
                res.setHeader('Content-Type', 'application/json')
                res.json({success: false, status: 'you are not authorized to perform this operation'})
            }
        }
        else {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.json({success: false, status: 'channel does not exists'})
        }
    })
})

router.route('/:channel')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.findOne({nameRef: req.params.channel})
    .then((channel) => {
        if(channel) {
            const ChannelMsgs = mongoose.model(channel.nameRef, channelMsgSchema)
            ChannelMsgs.find()
            .populate('user')
            .then((channelMsgs) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, msgs: channelMsgs})
            }, err => next(err))
        }
        else {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.json({success: false, status: 'channel does not exists'})
        }
    })
    .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.findOne({nameRef: req.params.channel})
    .then((channel) => {
        if(channel) {
            const ChannelMsgs = mongoose.model(channel.nameRef, channelMsgSchema)
            ChannelMsgs.create({
                user: req.user._id,
                message: req.body.message
            })
            .then((channelMsgs) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, msgs: channelMsgs})
            }, err => next(err))
        }
        else {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.json({success: false, status: 'channel does not exists'})
        }
    })
    .catch(err => next(err))
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Channel.findOne({nameRef: req.params.channel})
    .then((channel) => {
        if(channel) {
            if(channel.admin._id.equals(req.user._id)) {
                const ChannelMsgs = mongoose.model(channel.nameRef, channelMsgSchema)
                ChannelMsgs.deleteMany()
                .then((_) => {
                    channel.deleteOne()
                    .then(resp => {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'application/json')
                        res.json({success: true, response: resp})
                    })
                })
            }
            else {
                res.statusCode = 401
                res.setHeader('Content-Type', 'application/json')
                res.json({success: false, status: 'you are not authorized to perform this operation'})
            }
        }
        else {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.json({success: false, status: 'channel does not exists'})
        }
    })
    .catch(err => next(err))
})

module.exports = router
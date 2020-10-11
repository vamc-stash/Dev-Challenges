const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const authenticate = require('../authenticate')
const cors = require('./cors')

var User = require('../models/user')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const imageFilter = (req, file, cb) => {
	if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
		return cb(new Error('upload only image files'), false)
	}
	cb(null, true)
}

const upload = multer({storage: storage, fileFilter: imageFilter})

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json())

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
	User.findById(req.user._id)
	.then((user) => {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.json(user)
	}, err => next(err))
	.catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, upload.single('imageFile'), (req, res, next) => {
	User.findByIdAndUpdate(req.user._id, {
		$set: {
			image: {
				data: fs.readFileSync(path.join(__dirname + '/..' + '/public/images/' + req.file.originalname)),
				ContentType: 'image'
			}}})
	.then((user) => {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.json(user)
	}, err => next(err))
	.catch(err => next(err))
})

module.exports = uploadRouter
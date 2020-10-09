require('dotenv').config()
const environment = process.env.NODE_ENV
const stage = require('../config')[environment]

const cors = require('cors')

const whiteList = [`http://localhost:${stage.port}`, `https://localhost:${stage.securePort}`, 'http://localhost:3001']

var corsOptionsDelegate = (req, cb) => {
	//console.log('Origin: ', req.header('Origin'))
	var corsOptions
	if (whiteList.indexOf(req.header('Origin')) !== -1) {
		corsOptions = {origin: true}
	}
	else {
		corsOptions = {origin: false}
	}
	cb(null, corsOptions)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)
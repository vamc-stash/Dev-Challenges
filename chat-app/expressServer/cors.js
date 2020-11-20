const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

const cors = require('cors')

const whiteList = [`${stage.host}:${stage.port}`, `${stage.secureHost}:${stage.securePort}`, `${stage.host}:3001`]

const corsOptionsDelegate = (req, cb) => {
    var corsOptions
    if (whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    }
    else {
        corsOptions = { origin: false }
    }
    cb(null, corsOptions)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)
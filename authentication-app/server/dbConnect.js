require('dotenv').config()
const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

const mongoose = require('mongoose')  
mongoose.set('useNewUrlParser', true)

module.exports = () => {
	mongoose.connect(`mongodb://${stage.mongoUrl}/${stage.mongoDb}`)
	.then((db) => {
		console.log('Database connection is successful')
	}, (err) => console.log(err))
}
require('dotenv').config()
const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)

module.exports = () => {
    mongoose.connect(`mongodb://${stage.mongoUrl}/${stage.mongoDb}`)
        .then((db) => {
            console.log(`connection to DB ${db.connections[0].name} is successful`)
        }, err => console.error(err))
}
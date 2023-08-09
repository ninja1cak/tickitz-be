const express = require('express')
const route = express.Router()


const movie = require('./movie')
const genre = require('./genre')
const schedule = require('./schedule')
const booking = require('./booking')
const query = require('./query')
const user = require('./user')
const auth = require('./auth')

route.use('/movie', movie)
route.use('/genre', genre)
route.use('/schedule', schedule)
route.use('/booking', booking)
route.use('/search',query)
route.use('/user', user)
route.use('/auth', auth)


module.exports = route

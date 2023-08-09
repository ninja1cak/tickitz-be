const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/query')

route.get('/titleMovie', ctrl.queryByTitleMovie)
route.get('/multiParams', ctrl.queryByMultipleParams)
module.exports = route
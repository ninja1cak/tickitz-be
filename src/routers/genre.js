const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/genre')
const authCheck = require('../middleware/authCheck')

route.post('/insert', [authCheck.check, authCheck.isAdmin], ctrl.insertDataGenre)
route.get('/show', [authCheck.check, authCheck.isAdminOrUser], ctrl.getDataGenre)
route.put('/update/:id_genre', [authCheck.check, authCheck.isAdmin], ctrl.changeDataGenre)
route.delete('/delete/:id_genre', [authCheck.check, authCheck.isAdmin], ctrl.removeDataGenre)
module.exports = route

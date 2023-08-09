const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/schedule')
const authCheck = require('../middleware/authCheck')

route.get('/show', [authCheck.check, authCheck.isAdminOrUser], ctrl.getDataSchedule)
route.post('/insert', [authCheck.check, authCheck.isAdmin], ctrl.insertDataSchedule)
route.delete('/delete/:id_schedule', [authCheck.check, authCheck.isAdmin], ctrl.removeDataSchedule)
route.put('/update/:id_schedule', [authCheck.check, authCheck.isAdmin], ctrl.changeDataSchedule)
module.exports = route
const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/booking')
const authCheck = require('../middleware/authCheck')

route.get('/show', [authCheck.check, authCheck.isAdminOrUser], ctrl.getDataBooking)
route.get('/show/detail', [authCheck.check, authCheck.isAdminOrUser], ctrl.getDetailDataBooking)
route.delete('/delete/:id_booking', [authCheck.check, authCheck.isAdminOrUser], ctrl.removeDataBooking)
route.post('/insert', [authCheck.check, authCheck.isAdminOrUser], ctrl.insertDataBooking)
route.put('/update/:id_booking/:id_schedule', [authCheck.check, authCheck.isAdminOrUser], ctrl.changeDataBooking)
module.exports = route
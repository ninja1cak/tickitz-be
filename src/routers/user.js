const ctrl = require ("../controllers/user")
const express = require('express')
const route = express.Router()
const validate = require('../middleware/validateUserEmail')
const auth = require('../middleware/authCheck')
const upload = require('../middleware/upload')


route.post('/', validate, ctrl.insertDataUser)
route.get('/', [auth.check, auth.isAdminOrUser],ctrl.getDataByUser)
route.put('/', [auth.check, auth.isAdminOrUser], upload.single('image'),ctrl.changeDataByUser)
route.delete('/',[auth.check, auth.isAdminOrUser], ctrl.removeDataByUser)
module.exports = route
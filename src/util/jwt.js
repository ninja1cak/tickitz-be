const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = {
  generateToken: (data, role, id) =>{
    const payload = {
      data: data,
      role: role,
      id: id
    }

    const token = jwt.sign(payload, process.env.KEY, {expiresIn:'5h'})
    return token
  }

}
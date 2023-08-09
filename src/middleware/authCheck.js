const jwt = require('jsonwebtoken')
require('dotenv/config')
const authCheck = {}


authCheck.check = (req, res, next) =>{
  const {authorization} = req.headers

  if(!authorization){
    return res.send("silahkan login")
  }

  const token = authorization.replace("Bearer ", '')
  
  jwt.verify(token, process.env.KEY, (err, decode) => {
    if(err){
      return res.send("authentifikasi error")
    }
    req.user = decode.data
    req.role = decode.role
    req.id = decode.id
    return next()
  })
}

authCheck.isAdmin =  (req, res, next) =>{

  if(req.role == 'admin'){
    return next()
  }else{
    return res.send("required as admin")
  }
}

authCheck.isAdminOrUser = (req, res, next) =>{
  if(req.role == 'admin' || req.role == 'user'){
    return next()
  }else{
    return res.send('Role not identified')
  }
}

module.exports = authCheck

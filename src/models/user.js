const model = {}
const database = require('../config/database')


model.addUser = ({username, password_user, email_user, role, status, first_name, last_name}) =>{
  return new Promise ((resolve, reject) => {
    database.query(`INSERT INTO public.users(
      username,
      password_user,
      email_user, 
      role,
      status,
      first_name,
      last_name
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
      username,
      password_user,
      email_user,
      role,
      status,
      first_name, 
      last_name
    ]).then((result)=>{
      
      result = "User created successfully, check email for account verification"
      resolve(result)
    }).catch((error)=>{
      error = "account failed to create"
      reject(error)
    })
  })
}

model.readByUser = (username, email_user) =>{
  return new Promise ((resolve, reject) => {
    database.query(`SELECT * FROM public.users WHERE username = $1 OR email_user = $2`, [username, email_user])
    .then((res) => {
      resolve(res.rows)
    })
    .catch((error) =>{

      error = "Failed"
      reject(error)
    })

  })
}

model.updateDataByUser = ({username, email_user, password_user, id_user, phone_number, first_name, last_name, status}) =>{
  return new Promise ((resolve, reject) =>{
    console.log({phone_number})
    database.query(`UPDATE public.users 
    SET
      username = COALESCE(NULLIF($1, ''), username),      
      email_user = COALESCE(NULLIF($2, ''), email_user),
      password_user = COALESCE(NULLIF($3, ''), password_user),
      phone_number = COALESCE(NULLIF($4, '+62'), phone_number),
      first_name = COALESCE(NULLIF($5, ''), first_name),
      last_name = COALESCE(NULLIF($6, ''), last_name),
      status = $7
    WHERE id_user = $8`, [
      username,
      email_user,
      password_user,
      phone_number,
      first_name,
      last_name,
      status,
      id_user
    ])
    .then((result) => {
      console.log(result)

      resolve(result.rowCount)
    })
    .catch((error) =>{
      console.log(error)
      error = 'update failed'
      reject(error)
    })
  })
}

model.deleteDataUser = (username) =>{
  return new Promise ((resolve, reject) =>{
    database.query(`DELETE FROM users 
    WHERE username = $1`, [username])
    .then((result) =>{
      result = "delete success"
      resolve(result)
    })
    .catch((error)=>{
      error = "failed"
      reject(error)
    })
  })
}

model.updateDataStatus = ({email_user, status}) =>{
  return new Promise ((resolve, reject) =>{
    database.query(`UPDATE public.users 
    SET
      status = COALESCE(NULLIF($1, ''), status)      
    WHERE email_user = $2`, [
      status,
      email_user
    ])
    .then((result) => {
       
      resolve(result)
    })
    .catch((error) =>{
      error = 'update failed'
      reject(error)
    })
  })
}

module.exports = model
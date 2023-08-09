const model = {}
const database = require('../config/database')


model.addDataGenre = ({name_genre}) =>{
  return new Promise((resolve, reject) =>{
    database.query(`INSERT INTO public.genre (name_genre) VALUES ($1)`, [name_genre])
    .then(()=>{
      resolve("data genre successfully added")
    })
    .catch((e)=>{
      reject("Failed to add data")
    })
  })
}

model.readDataGenre = () => {
  return new Promise ((resolve, reject) =>{
    database.query(`SELECT * FROM public.genre`)
    .then((result) =>{
      resolve(result.rows)
    })
    .catch((e)=>{
      reject("Failed to read data")
    })
  })
}

model.updateDataGenre = ({name_genre, id_genre}) =>{
  return new Promise((resolve, reject) => {
    database.query(`UPDATE public.genre SET name_genre = $1 
    WHERE id_genre = $2`, [name_genre, id_genre])
    .then(() =>{
      resolve("data genre succesfully updated")
    })
    .catch((e)=>{
      reject("Failed to update data")
    })
  })
}

model.deleteDataGenre = ({id_genre}) =>{
  return new Promise((resolve, reject) => {
    database.query(`DELETE FROM public.genre WHERE id_genre = $1`, [id_genre])
    .then(() =>{
      resolve("data genre succesfully deleted")
    })
    .catch((e) =>{
      reject("Failed to delete data")
    })
  })
}

module.exports = model
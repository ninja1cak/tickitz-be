const model = {}
const database = require('../config/database')

model.queryByTitleMovie = ({title_movie}) =>{
  return new Promise((resolve, reject) => {
    database.query(`SELECT * FROM public.movie 
    WHERE title_movie 
    ILIKE $1 `,[title_movie])
    .then((result) =>{
      resolve(result.rows)          
    })
    .catch((e)=>{
      reject("failed to read data")
    })
  })
  
}

model.queryByMultipleParams = ({title_movie, release_date_movie, name_genre}) =>{
  return new Promise((resolve, reject) => {
    database.query(`SELECT * FROM public.movie pm 
    JOIN public.bridge_movie_genre pbmg ON pm.id_movie = pbmg.id_movie 
    JOIN public.genre pg ON pg.id_genre = pbmg.id_genre 
    WHERE title_movie ILIKE '$1%' AND date_part('year',release_date_movie) = $2 
    AND name_genre = $3`,[title_movie, release_date_movie, name_genre])
    .then((result) =>{
      resolve(result.rows)
    })
    .catch((e) =>{
      reject("faild to read data")
    })
    
  })
}
module.exports = model
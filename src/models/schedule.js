const model = {}
const database = require('../config/database')
const escape = require('pg-format')

model.addDataSchedule = ({      
  id_movie, 
  date_start, 
  date_end, 
  cinema_name, 
  cinema_address, 
  time_playing, 
  price_seat, 
  cinema_logo_url}) =>{
  
    return new Promise((resolve, reject)=>{
    database.query(`INSERT INTO public.schedule(
      id_movie, 
      date_start, 
      date_end, 
      cinema_name, 
      cinema_address, 
      time_playing, 
      price_seat, 
      cinema_logo_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
      id_movie,
      date_start,
      date_end, 
      cinema_name, 
      cinema_address, 
      time_playing, 
      price_seat, 
      cinema_logo_url
    ])
    .then((result) =>{
      resolve(`${result.rowCount} data schedule succesfully added`)
    })
    .catch((e) =>{
      reject(e)
    })
  })
}


model.readDataSchedule = async ({page, limit, id_schedule}) =>{
  // eslint-disable-next-line no-useless-catch
  try {
    
    let filterQuery = ''


    if(id_schedule){
      filterQuery = escape(`WHERE id_schedule = %s`, id_schedule)
    }

    const offset = (page - 1) * limit
    
    
    const totalData = await database.query(`SELECT COUNT(id_schedule) FROM public.schedule ${filterQuery}`)
    const count = totalData.rows[0].count
    const data = await database.query(`SELECT * FROM public.schedule ${filterQuery} LIMIT $1 OFFSET $2 `, [limit, offset])
    
    const meta = {
      next: count <= 0 ? null : Math.ceil(count/limit) == page ? null : Number(page) + 1,
      prev: page == 1 ? null : Number(page) - 1,
      total: count
    }

    return {
      meta : meta,
      data : data.rows,

    }

  } catch (error) {
    throw error
  }
}

model.updateDataMovie = ({price_seat, id_schedule}) =>{
  return new Promise((resolve, reject) =>{
    database.query(`UPDATE public.schedule 
    SET price_seat = $1 
    WHERE id_schedule = $2`, [price_seat, id_schedule])
    .then((result) => {
      resolve(`${result.rowCount} data schedule succesfully updated`)
    })
    .catch((e) => {
      reject(e)
    })
  })
}

model.deleteDataMovie = ({id_schedule}) =>{
  return new Promise((resolve, reject) => {
    database.query(`DELETE FROM public.schedule WHERE id_schedule = $1`,[id_schedule])
    .then((result)=>{
      resolve(`${result.rowCount} data schedule succesfully deleted`)
    })
    .catch((e) =>{
      reject(e)
    })
  })
}

model.readDataScheduleBy = ({id_schedule}) =>{
  return new Promise((resolve, reject) => {
    database.query(`SELECT price_seat FROM public.schedule WHERE id_schedule = $1`, [id_schedule])
    .then((result) =>{
      resolve(result.rows)
    })
    .catch((error) =>{
      reject(error)
    })
  })
}

module.exports = model
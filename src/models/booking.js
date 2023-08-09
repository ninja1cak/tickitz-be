const model = {}
const database = require('../config/database')
const escape = require('pg-format')


model.addDataBooking = ({      
  id_movie,
  id_schedule,
  total_prices_booking,
  seats_booking,
  watch_date,
  payment_method,
  id_user }) =>{
    return new Promise((resolve, reject)=>{
    database.query(`INSERT INTO public.booking(
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method,
      id_user
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method,
      id_user     
    ])
    .then((result) =>{
      resolve(`${result.rowCount} data booking succesfully added`)
    })
    .catch((e) =>{
      reject(e)
    })
  })
}

model.readDataBooking = async (role, id_user, {page, limit, id_booking}) =>{
 // eslint-disable-next-line no-useless-catch
 try {
    const offset = (page-1) * limit  
    let count = 0
    let getData = {}
    let filterQuery = ''
    
    if(id_booking){
      filterQuery += escape(`AND id_booking = %s`,id_booking)

    }
    
    if(role == 'user'){

      const totalData = await database.query(`SELECT COUNT(id_user) FROM public.booking WHERE id_user = $1 ${filterQuery}`,[id_user])
      count = totalData.rows[0].count    
      getData = await database.query(`SELECT * FROM public.booking WHERE id_user = $1 ${filterQuery} LIMIT $2 OFFSET $3`,[id_user, limit, offset])
    }

    if(role == 'admin'){
      const totalData = await database.query(`SELECT COUNT(id_booking) FROM public.booking`)
      count = totalData.rows[0].count
      getData = await database.query(`SELECT * FROM public.booking WHERE true ${filterQuery} LIMIT $1 OFFSET $2`,[limit, offset])
    }

    const meta = {
      next: count <= 0 ? null : count/limit == page ? null : Number(page) + 1,
      previous: page == 1 ? null : Number(page) - 1,
      total : count
    }

    const data = {
      meta,
      data: getData.rows
    }

    return data
 } catch (error) {
    throw error
 }
}

model.updateDataBooking = ({seats_booking, id_booking, total_prices_booking, id_user}) =>{
  return new Promise((resolve,reject) =>{

    database.query(`UPDATE public.booking 
    SET 
     
      seats_booking = $1,
      total_prices_booking = $2
      
    WHERE id_booking = $3 AND id_user = $4`,[seats_booking, total_prices_booking, id_booking, id_user])
    .then((result)=>{
      if(result.rowCount <= 0 ){
        resolve(false)
      }
      resolve(`${result.rowCount} data booking succesfully updated`)
    })
    .catch((err) => {
      reject(err)
    })

  })
}

model.deleteDataBooking = ({id_booking, id_user}) =>{
  return new Promise((resolve,reject)=>{
    database.query(`DELETE FROM public.booking
    WHERE id_booking = $1 AND id_user = $2`, [id_booking, id_user])
    .then((result) =>{
      if(result.rowCount == 0) resolve(false)
      resolve(`${result.rowCount}data booking succesfully deleted`)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

model.readDetailDataBooking = async ({id_user, page, limit}) =>{
  // eslint-disable-next-line no-useless-catch
  try {
    const offset = (page-1) * limit

    const totalData = await database.query(`SELECT COUNT(id_user) count FROM booking WHERE id_user = $1`, [id_user])
    const count = totalData.rows[0].count
    const meta = {
      next: count <= 0 ? null : Math.ceil(count/limit) == page ? null : Number(page) +1,
      prev: page == 1 ? null : Number(page) - 1,
      total: count
    }

    const result = await database.query(` select 
      m.title_movie, 
      b.seats_booking, 
      b.watch_date, 
      b.payment_method, 
      s.cinema_name, 
      s.cinema_address, 
      s.time_playing 
    from booking b join schedule s on b.id_schedule = s.id_schedule 
    join movie m on m.id_movie = b.id_movie where b.id_user = $1 limit $2 offset $3`, [id_user, limit, offset])

    return {meta, data: result.rows}
  } catch (error) {
    throw error
  }

}

module.exports = model
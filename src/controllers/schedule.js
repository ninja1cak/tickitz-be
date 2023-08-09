const ctrl = {}
const model = require('../models/schedule')
const {respons} = require('../util/respons')

ctrl.insertDataSchedule = async (req, res) =>{
  try {
    

    const {id_movie, date_start, date_end, cinema_name, cinema_address, time_playing, price_seat, cinema_logo_url} = req.body
    const result = await model.addDataSchedule({id_movie, date_start, date_end, cinema_name, cinema_address, time_playing, price_seat, cinema_logo_url})
    return respons(res, 200, result)

  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.getDataSchedule = async (req, res) => {
  try{
    const params = {
      page : req.query.page || 1,
      limit : req.query.limit || 2,
      id_schedule: req.query.id_schedule 
    }
    const result = await model.readDataSchedule(params)
    return respons(res, 201, result)
  }catch(error){
    return respons(res, 500, error.message)
  }
}

ctrl.changeDataSchedule = async (req,res) =>{
  try {

    const {id_schedule} = req.params
    const {price_seat} = req.body
    const result = await model.updateDataMovie({price_seat, id_schedule})
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.removeDataSchedule = async (req, res) =>{
  try{
    
    

    const {id_schedule} = req.params
    const result = await model.deleteDataMovie({id_schedule})
    return respons(res, 200, result)
  }catch(error){
    return respons(res, 500, error.message)
  }
}






module.exports = ctrl
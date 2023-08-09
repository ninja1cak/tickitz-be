const ctrl = {}
const model = require('../models/genre')
const {respons} = require('../util/respons')

ctrl.insertDataGenre = async (req, res) =>{
  try {

    const {name_genre} = req.body
    const result = await model.addDataGenre({name_genre})
    return res.status(200).json(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.getDataGenre = async (req, res) => {
  try{
    const result = await model.readDataGenre();
    return respons(res, 200, result)

  }catch(error){
    return respons(res, 500, error.message)
  }
}

ctrl.changeDataGenre = async (req, res) => {
  try {
    

    const {id_genre} = req.params
    const {name_genre} = req.body
    const result = await model.updateDataGenre({name_genre, id_genre})
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.removeDataGenre = async (req, res) =>{
  try {

    const {id_genre} = req.params
    const result = await model.deleteDataGenre({id_genre})
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

module.exports = ctrl
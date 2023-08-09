const ctrl = {}
const model = require('../models/query')


ctrl.queryByTitleMovie = async (req,res) => {
  try {
    let {title_movie} = req.query
    title_movie = title_movie + '%'

    const result = await model.queryByTitleMovie({title_movie})
    return res.status(200).json(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.queryByMultipleParams = async (req, res) =>{
  try {
    let {title_movie,release_date_movie,name_genre} = req.query

    const result = await model.queryByMultipleParams({title_movie, release_date_movie, name_genre})
    return res.status(200).json(result)

  } catch (error) {
    return res.send(error)
  }
}

module.exports = ctrl

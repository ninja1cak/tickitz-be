const ctrl = {}
const model = require('../models/movie')
const upload = require('../util/upload')
const {respons} = require('../util/respons')

ctrl.insertDataMovie = async (req, res) =>{
  try{

    console.log('body', req.body)

    if(req.file !== undefined){
      req.body.url_image_movie = await upload(req.file.path)
      console.log(req.body.url_image_movie)

    }else{
      return respons(res, 400, "jpg, jpeg, or png only")
    }
    console.log(req.body)
    let {title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie, duration_movie, synopsis_movie} = req.body
    
    if(!Array.isArray(genre)){
      genre =genre.split(',')
      console.log(genre)
    }

    if(!Array.isArray(casts_movie)){
      casts_movie = casts_movie.split(',')

    }

    const result = await model.addDataMovie({title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie, duration_movie, synopsis_movie})
    
    return respons(res, 201, result)

  }catch(e){
    
    return respons(res, 500, e.message)
  }
}

  
ctrl.getDataMovie = async (req, res) =>{
  try{
    const {page, limit, search} = req.query
    
    if(search ===undefined || search === ''){
      req.query.search = ''
    }else{
      req.query.search =`%${search}%`
    }

    const params = {
      ...req.query,
      page : page || 1,
      limit : limit || 3
    }

    console.log(params.search)

    const result = await model.readDataMovie(params)
    return respons(res, 200, result)

  }catch(e){
    return respons(res, 500, e.message)
  }
}

ctrl.changaDataMovie = async (req, res)=>{
  try{
    console.log(req.body)
    const {id_movie} = req.params
   
    if(req.file != undefined){
      req.body.url_image_movie = await upload(req.file.path)
      console.log(req.body.url_image_movie)
    }

    const {title_movie, 
      genre, 
      director_movie, 
      casts_movie, 
      release_date_movie, 
      url_image_movie, 
      synopsis_movie,
      duration_movie} = req.body
    
    
    const dataMovie = {
      title_movie,
      director_movie,
      casts_movie,
      release_date_movie,
      url_image_movie,
      synopsis_movie,
      duration_movie
    }

    
    // const result = await model.updateDataMovie({  
    //   title_movie, 
    //   genre, 
    //   director_movie, 
    //   casts_movie, 
    //   release_date_movie, 
    //   url_image_movie, 
    //   id_movie, 
    //   synopsis_movie,
    //   duration_movie})

    const result = await model.updateDataMovie(dataMovie,{id_movie, genre})
    
    return respons(res, 200, result)
  }catch(e){
    return respons(res, 500, e.message)
  }
}

ctrl.removeDataMovie = async (req, res) =>{
  try{
    

    const {id_movie} = req.params

    const result = await model.deleteDataMovie({id_movie})
    return respons(res, 200, result)
  }catch(e){
    return respons(res, 500, e.message)
  }
}

ctrl.getDataMovieBy = async (req, res) =>{
  try {
    const params = {
      page : req.query.page || 1,
      limit : req.query.limit || 3,
      orderBy : req.query.orderBy ||'title_movie',
      search : req.query.search
    }

    const result = await model.readDataMovieBy(params)
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

module.exports = ctrl
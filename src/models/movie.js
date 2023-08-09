const model = {}
const database = require('../config/database')
const escape = require('pg-format')


model.addDataMovie = async ({title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie, duration_movie, synopsis_movie}) =>{
  const pg = await database.connect()
  try {
    await pg.query('BEGIN')
    console.log('sebelum')
    const movie = await database.query(`INSERT INTO public.movie(
      title_movie,
      director_movie,
      casts_movie, 
      release_date_movie,
      url_image_movie,
      duration_movie,
      synopsis_movie
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_movie`,[
        title_movie,
        director_movie,
        casts_movie, 
        release_date_movie,
        url_image_movie,
        duration_movie,
        synopsis_movie
      ])
      console.log('data movie added')
    if(genre && genre.length > 0){
      genre.map( async (element) => {
        return await pg.query(`INSERT INTO
          public.bridge_movie_genre(id_movie, id_genre)
          VALUES ($1, $2)  
        `,[
          movie.rows[0].id_movie,
          element
        ])
      })
    }
    
    console.log('data genre added')
    await pg.query('COMMIT')
    return 'data movie created'
    
  } catch (error) {
    await pg.query('ROLLBACK')
    throw error
  }
}

model.readDataMovie = async ({page, limit, id_movie, genre, search}) =>{
  // eslint-disable-next-line no-useless-catch
  try {

    const offset =  (page-1) * limit
    let filterQuery = ''
    let genreQuery = ''
    let searchQuery = ''
    if(id_movie){
      filterQuery += escape(`AND m.id_movie = %s`, id_movie)
    }

    if(genre){
      genreQuery += escape(`AND name_genre = %L`, genre)
    }

    if(search){
      searchQuery += escape(`AND title_movie ILIKE %L`, search)
    }

    console.log(searchQuery, genreQuery, filterQuery)
    
    const totalData = await database.query(
      `SELECT COUNT(id_movie) count FROM public.movie`
    )
    const count = totalData.rows[0].count
    const meta = {
      next : count == 0 ? null : page == Math.ceil(count/limit) ? null : Number(page) + 1,
      prev : page == 1 ? null : Number(page) - 1,
      total: count
    }

    const data  = await database.query(
      `
      SELECT  
      m.id_movie,  
      title_movie,
        json_agg(
          JSONB_BUILD_OBJECT(
            'id', g.id_genre,
            'value', g.name_genre
          )
        ) genre,
        release_date_movie,
        director_movie,
        casts_movie,
        synopsis_movie,
        url_image_movie,
        duration_movie
      FROM public.movie m LEFT JOIN public.bridge_movie_genre pbmg
      ON m.id_movie = pbmg.id_movie LEFT JOIN public.genre g
      ON g.id_genre = pbmg.id_genre WHERE true ${filterQuery} ${genreQuery} ${searchQuery} GROUP BY m.id_movie
      LIMIT $1 OFFSET $2
      `,[
        limit, offset
      ]
    )
   
    return {
      meta: meta,
      data: data.rows
    }
    
  } catch (error) {
    throw error
  }
}

model.updateDataMovie = async (dataMovie, {genre, id_movie}) => { 

    let updates = []
    let values = []
    let i =0
    console.log(dataMovie, genre, id_movie)
    
    Object.keys(dataMovie).forEach((key)=>{
      console.log('a :', dataMovie[key])
      if(dataMovie[key] !== undefined && dataMovie[key] !=''){
          updates.push(`${key} = $${i+1}`)
          if(dataMovie[key].includes(',') && key != 'synopsis_movie'){
            values.push(dataMovie[key].split(','))

          }else(
            values.push(dataMovie[key])
          )
          i++
      }
    })
    values.push(id_movie)
    console.log('updates', updates)
    console.log('values', values)

    
    const pg = await database.connect()
    try {
      await pg.query('BEGIN')
      
      if(updates !=''){
        await pg.query(`UPDATE public.movie
        SET
          ${updates.join(', ')}
        WHERE 
          id_movie = $${values.length}   
        `,values)
      }

      

      
      if(genre !== undefined && genre != ''){
        genre = genre.split(',').map(Number)

        const getDataMovieGenre = await pg.query(`SELECT id_bridge_movie_genre 
        FROM public.bridge_movie_genre WHERE id_movie = $1`,[id_movie])

        if(genre.length < getDataMovieGenre.rowCount){
          getDataMovieGenre.rowCount = 0
          await database.query(`
              DELETE FROM public.bridge_movie_genre WHERE id_movie = $1            
          `, [id_movie])
        }

        genre.map( async (element, index) => {    
          
          if(index < getDataMovieGenre.rowCount && getDataMovieGenre.rowCount != 0){
            return await database.query(`UPDATE public.bridge_movie_genre
            SET 
              id_genre = $1
            WHERE
              id_bridge_movie_genre = $2
          `,[
            element,
            getDataMovieGenre.rows[index].id_bridge_movie_genre
          ])
          }else{
            return await database.query(`INSERT INTO public.bridge_movie_genre (
              id_genre,
              id_movie
            ) VALUES (
              $1,
              $2
            )`, 
            [
            element,
            id_movie
          ])
          }

        })
    }
      await pg.query("COMMIT")   
      return "update success"
    } catch (error) {
      await pg.query("ROLLBACK")
      throw error
    }
  }


model.deleteDataMovie = async ({id_movie}) =>{
  const pg = await database.connect()
  try {
    await pg.query('BEGIN')
    
    await pg.query('DELETE FROM public.bridge_movie_genre WHERE id_movie = $1', [id_movie])

    const result = await pg.query('DELETE FROM public.movie WHERE id_movie = $1', [id_movie]) 
    await pg.query('COMMIT')
    return `${result.rowCount} delete berhasil`
  } catch (error) {
    await pg.query('ROLLBACK')
    throw error
  }
}

model.readDataMovieBy = async ({page, limit, orderBy, search}) =>{
  // eslint-disable-next-line no-useless-catch
  try {
    search[0] += '%'
    
    const offset = (page - 1) * limit
    const totalData = await database.query(`SELECT COUNT(distinct m.id_movie) count FROM public.movie m
    JOIN public.bridge_movie_genre bmg  on 
    bmg.id_movie  =  m.id_movie  
    JOIN genre g on g.id_genre = bmg.id_genre 
    WHERE title_movie ILIKE $1
    AND date_part('year', release_date_movie) = $2
    AND name_genre  ilike $3`,[
      search[0],
      search[1],
      search[2]
    ])

    const count = totalData.rows[0].count



    const meta = {
      next : count <= 0 ? null : page == Math.ceil(count/limit) ? null : Number(page) +1,
      prev: page == 1 ? null : Number(page) - 1,
      total: count
    }   
 
    const data = await database.query(`
    SELECT
      title_movie,
      json_agg(
        JSONB_BUILD_OBJECT(
          'id', g.id_genre,
          'genre', g.name_genre)
      ),
      director_movie,
      casts_movie,
      synopsis_movie
    FROM public.movie m 
    JOIN public.bridge_movie_genre bmg 
    ON m.id_movie = bmg.id_movie 
    JOIN public.genre g
    ON g.id_genre = bmg.id_genre
    WHERE title_movie ILIKE $1 
    AND date_part('year', release_date_movie) = $2
    AND name_genre ILIKE $3
    GROUP BY m.id_movie 
    ORDER BY $4 ASC
    LIMIT $5 OFFSET $6;
    `,
    [
      search[0],
      search[1],
      search[2],
      orderBy,
      limit,
      offset
    ])

    return {
      meta : meta,
      data : data.rows
    }
    
  } catch (error) {
    throw error
  }
}

module.exports = model
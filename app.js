require('dotenv/config')
const express = require('express')
const app = express()
const database = require('./src/config/database')
const routers = require('./src/routers/index')
const port = process.env.PORT
const cors = require('cors')

const corsOption = {
  credentials: true,
  origin: '*'
}
app.use(cors(corsOption))
app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use(routers)




database.connect().then(() =>{
  app.listen(port,()=>{
    console.log("app running on port " + port)
  })
}).catch(() =>{
  console.log("database not connected")
})

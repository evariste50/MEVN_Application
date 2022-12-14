// imports

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT

//middlewares

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("uploads")) 

//connection to database

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("connected to Database Succesfully")).catch(err=>{
    console.log(err);
})
 
//routes prefix
app.use("/api/post", require('./routes/router'))

//start server
app.listen(port, ()=>console.log(`server running at http://localhost:${port}`))
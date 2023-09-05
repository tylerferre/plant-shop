const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
const path = require('path')
require('dotenv').config()
process.env.SECRET

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.connect(
    uri,
    () => console.lgo('Connected to DB')
)

//routes


app.use((err, req, res, next) => {
console.log(err)
if(err.name === "UnauthorizedError"){
    res.status(err.status)
}
return res.send({errMsg: err.message})
})

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use(9000, () => {
    console.log("Server is running on port 9000")
})
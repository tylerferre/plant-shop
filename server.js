const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
const path = require('path')
require('dotenv').config()
uri = process.env.URI
process.env.SECRET

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.connect(uri)
.then(console.log('Connected to DB'))
.catch(err => console.log(err))

app.use('/proxy/auth', require('./routes/AuthRouter'))
app.use('/proxy/products', require('./routes/ProductRouter'))
app.use('/proxy/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/proxy/api/user', require('./routes/UserRouter'))
app.use('/proxy/api/review', require('./routes/ReviewRouter'))
app.use('/proxy/review', require('./routes/ReviewRouter'))


app.use((err, req, res, next) => {
console.log(err)
if(err.name === "UnauthorizedError"){
    res.status(err.status)
}
return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})
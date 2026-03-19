const express = require('express')
const DateBase = require('./config/database.js')

const authRoutes = require('./routes/auth.routes.js')
const cookieParser = require('cookie-parser')



DateBase()


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoutes)

module.exports = app
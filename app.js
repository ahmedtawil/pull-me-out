const express = require('express');
require('dotenv').config({ path: './configs/config.env' })
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')
const ErrorHandler = require('./utils/errorHandler');
const {isAuthenticatedUser} = require('./middlewares/auth')
const expressLayouts = require('express-ejs-layouts');



const dashboardController = require('./controllers/dashboard')
const authController = require('./controllers/auth')
const utilsController = require('./controllers/utils')
const manageVolunteersController = require('./controllers/manageVolunteers')
const manageAdminsController = require('./controllers/manageAdmins')


const app = express();
app.use(expressLayouts)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/' , authController)
app.use(async(req, res, next) => {
    res.locals.user = req.user
    next()
})

app.use(isAuthenticatedUser)

app.use('/', dashboardController)
app.use('/utils', utilsController)
app.use('/volunteers', manageVolunteersController)
app.use('/admins', manageAdminsController)

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app


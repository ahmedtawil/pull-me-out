const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')


router.get('/dashboard', catchAsyncErrors(async (req, res,) => {
    res.render('report/list')
}))



module.exports = router
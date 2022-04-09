const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')


router.get('/page/get', async function (req, res, next) {
    res.render('news/list' , {layout:false})
})



module.exports = router
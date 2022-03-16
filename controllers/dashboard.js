const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')


router.get('/', catchAsyncErrors(async (req, res,) => {
    res.render('dashboard/cpanel')
}))



module.exports = router
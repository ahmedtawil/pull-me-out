const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const User = require('../models/User')


router.get('/page/get', catchAsyncErrors(async (req, res,) => {
    console.log('from admins controller!');
    res.render('admin/list')
}))

router.get('/data/get', catchAsyncErrors(async (req, res,) => {
    console.log('from admins cpanel!');

    res.render('dashboard/cpanel')
}))



module.exports = router
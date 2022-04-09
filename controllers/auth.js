const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash');
const sendToken = require('../utils/jwtToken');
const User = require('../models/User');


router.get('/sign-up', async function (req, res, next) {
    res.render('auth/sign-up', { layout: false })
})

router.get('/sign-in', async function (req, res, next) {
    if(req.user) return res.redirect('/dashboard')
    console.log(req.user);
    res.render('auth/sign-in', { layout: false })
})

router.get('/sign-out', async function (req, res, next) {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.redirect('/sign-in')

})


router.post('/sign-up', async function (req, res, next) {
    const { nationalID, fullName, phoneNumber, birthDate, password, email, city , region, carType, tools } = req.body

    const newUserObj = {
        nationalID, fullName, phoneNumber, birthDate, password, email, city , region, carType, tools,
        type:'volunteer',
        position:'volunteer',
        status:'pending',
    }
    const newUser = new User(newUserObj)
    await newUser.save()
    res.json({ success: true })
})

router.post('/sign-in', async function (req, res, next) {
    const { email, password } = req.body;
    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('الرجاء إدخال البريد الإلكتروني وكلمة المرور.', 400))
    }
    // Finding user in database
    const user = await User.findOne({ email , password })

    if (!user) {
        return next(new ErrorHandler('خطأ في رقم البريد الإلكتروني أو كلمة المرور.', 400));
    }
    
    if(user.status == 'pending')  return next(new ErrorHandler('في إنتظار الموافقة على طلبك!', 400))

    sendToken(user, 200, res)
})



module.exports = router
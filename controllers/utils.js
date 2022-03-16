const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const User = require('../models/User')

router.post('/check-national-ID', async (req, res) => {
    const { nationalID, id = null } = req.body
    const found = await User.findOne({ nationalID })
    if (found) {
        if (!id) return res.status(200).json({ isExisted: true })
        const found1 = await User.findOne({ _id: id })

        if (nationalID == found1.nationalID) {
            return res.status(200).json({ isExisted: false })

        } else if (nationalID !== found1.formalID) {
            return res.status(200).json({ isExisted: true })

        }

    } else if (!found) return res.status(200).json({ isExisted: false })


})
module.exports = router
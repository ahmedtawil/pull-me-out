const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const { CITIES, REPORTS_TYPES, REPORTS_STATUS } = require('../data/constants')

const News = require('../models/News')
const { isAuthenticatedUser } = require('../middlewares/auth')


router.get('/page/get', async function (req, res, next) {
    res.render('news/list', { layout: false })
})

router.get('/data/get', async function (req, res, next) {

    const query = req.query

    const queryValue = (req.query.search.value == '') ? {} : JSON.parse(query.search.value)
    let queryObj = {}

    if (queryValue.filter) {
        queryObj.$and = [queryValue.filter]
    }

    if (queryValue.search) {
        let val = queryValue.search
        const qu = {
            $regex: val,
            $options: 'i'
        }
        const searchQuery = { $or: [{ title: qu }, { body: qu }] }
        if (queryValue.filter) {
            queryObj.$and.push(searchQuery)
        } else {
            queryObj = searchQuery
        }
    }

    const newsCount = await News.countDocuments({ status: 'active' })
    const newsFillterCount = await News.find({ status: 'active' }).find(queryObj).countDocuments()
    const news = await News.find({  status: 'active' }).find(queryObj).limit(parseInt(query.length)).sort({createdAt:-1}).skip(parseInt(query.start)).populate('createdBy')

   

    return res.json({
        recordsTotal: newsCount,
        recordsFiltered:newsFillterCount, 
        news,
        CITIES,
    })
})



router.post('/new',isAuthenticatedUser, async function (req, res, next) {
    const { title, body } = JSON.parse(req.body.payload)
    const newNews = new News({
        title, body,
        createdBy: req.user._id
    })
    await newNews.save()
    res.json({ success: true })
})



module.exports = router
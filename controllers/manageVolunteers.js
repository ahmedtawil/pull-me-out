const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const User = require('../models/User')


router.get('/page/get', catchAsyncErrors(async (req, res,) => {
    res.render('volunteer/list')
}))

router.get('/data/get', catchAsyncErrors(async (req, res,) => {
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
    const searchQuery = { $or: [{ formalID: qu }, { name: qu }, { phoneNumber: qu }] }
    if (queryValue.filter) {
      queryObj.$and.push(searchQuery)
    } else {
      queryObj = searchQuery
    }
  }

  const volunteersCount = await User.countDocuments({type:'volunteer'})
  const volunteersFillterCount = await User.find({type:'volunteer'}).find(queryObj).countDocuments()
  const volunteers = await User.find({type:'volunteer'}).find(queryObj).limit(parseInt(query.length)).skip(parseInt(query.start))

  return res.json({
    recordsTotal: volunteersCount,
    recordsFiltered: volunteersFillterCount,
    volunteers
  })
}))



module.exports = router
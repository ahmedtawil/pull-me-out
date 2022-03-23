const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const User = require('../models/User')


router.get('/page/get', catchAsyncErrors(async (req, res,next) => {
    res.render('volunteer/list')
}))

router.get('/data/get', catchAsyncErrors(async (req, res,next) => {
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

  const volunteersCount = await User.countDocuments({type:'volunteer' , status:'approved'})
  const volunteersFillterCount = await User.find({type:'volunteer', status:'approved'}).find(queryObj).countDocuments()
  const volunteers = await User.find({type:'volunteer', status:'approved'}).find(queryObj).limit(parseInt(query.length)).skip(parseInt(query.start))

  return res.json({
    recordsTotal: volunteersCount,
    recordsFiltered: volunteersFillterCount,
    volunteers
  })
}))

router.get('/requests/page/get', catchAsyncErrors(async (req, res,next) => {
  res.render('volunteer/requests-list')
}))

router.get('/requests/data/get', catchAsyncErrors(async (req, res,next) => {
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

const volunteersCount = await User.countDocuments({type:'volunteer', $or:[{status:'pending'} , {status:'rejected'}]})
const volunteersFillterCount = await User.find({type:'volunteer' , $or:[{status:'pending'} , { status:'rejected'}]}).find(queryObj).countDocuments()
const volunteers = await User.find({type:'volunteer', $or:[{status:'pending'} , {status:'rejected'}]}).find(queryObj).limit(parseInt(query.length)).skip(parseInt(query.start))

return res.json({
  recordsTotal: volunteersCount,
  recordsFiltered: volunteersFillterCount,
  volunteers
})
}))

router.get('/approve/:id', catchAsyncErrors(async (req, res,next) => {
  const volunteerID = req.params.id
  if (!mongoose.isValidObjectId(volunteerID)) return next(new ErrorHandler('bad volunteer id!', 400))
  await User.updateOne({_id:volunteerID , status:'pending'} , {status:'active'})


  res.redirect('back')

}))

router.get('/reject/:id', catchAsyncErrors(async (req, res,next) => {
  const volunteerID = req.params.id
  if (!mongoose.isValidObjectId(volunteerID)) return next(new ErrorHandler('bad volunteer id!', 400))
  await User.updateOne({_id:volunteerID , status:'pending'} , {status:'rejected'})


  res.redirect('back')

}))



module.exports = router
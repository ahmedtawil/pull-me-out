const router = require('express').Router()
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const { CITIES, REPORTS_TYPES, REPORTS_STATUS } = require('../data/constants')
const User = require('../models/User');
const Report = require('../models/Report');


router.get('/new', catchAsyncErrors(async (req, res,) => {

    res.render('report/new', { layout: false })
}))

router.get('/data/get', catchAsyncErrors(async (req, res,) => {

    res.render('dashboard/cpanel')
}))


router.get('/open/data/get', catchAsyncErrors(async (req, res,) => {

    const reportsCount = await Report.countDocuments({ status: 'open' })
    const reports = await Report.find({ status: 'open' }).sort({ createdAt: -1 }).populate('volunteer').populate('stranded')

    return res.json({
        recordsTotal: reportsCount,
        recordsFiltered: reportsCount,
        reports,
        CITIES, REPORTS_TYPES,
    })

}))

router.get('/running/data/get', catchAsyncErrors(async (req, res,) => {

    const reportsCount = await Report.countDocuments({ status: 'running' })
    const reports = await Report.find({ status: 'running' }).sort({ createdAt: -1 }).populate('volunteer').populate('stranded')

    return res.json({
        recordsTotal: reportsCount,
        recordsFiltered: reportsCount,
        reports,
        CITIES, REPORTS_TYPES,
    })

}))

router.get('/closed/data/get', catchAsyncErrors(async (req, res,) => {

    const reportsCount = await Report.countDocuments({ status: 'closed' })
    const reports = await Report.find({ status: 'closed' }).sort({ createdAt: -1 }).limit(20).populate('volunteer').populate('stranded')

    return res.json({
        recordsTotal: reportsCount,
        recordsFiltered: reportsCount,
        reports,
        CITIES, REPORTS_TYPES,
    })

}))


router.get('/page/get/:id', catchAsyncErrors(async (req, res,) => {
    const reportID = req.params.id
    if (!mongoose.isValidObjectId(reportID)) return next(new ErrorHandler('bad report id!', 400))

    const report = await Report.findById(reportID).populate('volunteer').populate('stranded')
    if (!report) return next(new ErrorHandler('report not found!', 404))


    res.render('report/view', { report, CITIES, REPORTS_TYPES, REPORTS_STATUS, moment })

}))

router.get('/recive/:id', catchAsyncErrors(async (req, res, next) => {
    const reportID = req.params.id
    if (!mongoose.isValidObjectId(reportID)) return next(new ErrorHandler('bad report id!', 400))

    const action = req.query.action
    console.log(reportID , action);

    const report = await Report.findById(reportID)
    if (!report) return next(new ErrorHandler('report not found!', 404))
    if (report.status == 'closed') return next(new ErrorHandler('report is closed !', 400))

    if (action == 'recive') {
        report.status = 'running'
        report.volunteer = req.user._id

    } else {
        report.status = 'open'
        report.volunteer = null
    }
    await report.save({validateBeforeSave:false})
    res.json({ success: true })

}))



router.post('/new', catchAsyncErrors(async (req, res,) => {
    const { fullName, nationalID, phoneNumber, birthDate, city, region, carType, type } = JSON.parse(req.body.payload)
    const newReportData = {
        status: 'open',
        type,
    }

    let existUser = await User.findOne({ type: 'stranded', $or: [{ nationalID }, { phoneNumber }] })
    if (!existUser) {
        const newUser = new User({
            fullName, nationalID, phoneNumber, birthDate, city, region, carType,
            type: 'stranded',
            position: 'stranded',
            status: 'active',
        })
        newReportData.stranded = newUser._id
        await newUser.save()
        existUser = newUser
    }

    newReportData.stranded = existUser._id
    const newReport = new Report(newReportData)
    await newReport.save({ validateBeforeSave: false })
    res.end()
}))



module.exports = router
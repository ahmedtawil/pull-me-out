const moment = require('moment');
const mongoose = require('mongoose')
const { Schema } = mongoose;
const _ = require('lodash');


const reportSchema = new Schema({
    code: {
        type: String,
    },
    status: {
        type:String,
        enum: ['open', 'closed', 'running', 'deleted'],
        required:true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stranded: { type: Schema.Types.ObjectId, ref: 'Stranded', required: true },
    evaluation: { type: Schema.Types.ObjectId, ref: 'Evaluation', required: true },

    description:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('Report', reportSchema)
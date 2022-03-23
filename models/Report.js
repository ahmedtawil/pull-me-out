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
    stranded: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User',
        default: null
    },
    updatedBy: {
        type: Schema.Types.ObjectId, ref: 'User',
        default: null
    },

    updatedAt: {
        type: Date,
        default: null
    }

})
module.exports = mongoose.model('Report', reportSchema)
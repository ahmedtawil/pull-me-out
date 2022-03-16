const moment = require('moment');
const mongoose = require('mongoose')
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')
const _ = require('lodash');


const userSchema = new Schema({
    type: {
        type: String,
        enum: {
            values: ['admin', 'volunteer', 'stranded'],
            message: 'نوع المستخدم غير صالح!'
        }
    },
    nationalID: {
        type: String,
        maxlength: [9, ''],
        minlength: [9, ''],
        required:true,
        validate:
            [
                {
                    validator: async function (nationalID) {
                        console.log(nationalID);
                        const user = await this.constructor.findOne({ nationalID });
                        if (user) {

                            if (this.id == user.id) {
                                return true;
                            }
                            return false;
                        }
                        return true
                    },
                    message: 'الرقم القومي موجود مسبقاً!'
                }, {
                    validator: function (nationalID) {
                        return !isNaN(Number(nationalID)) && nationalID.indexOf('0') != 0

                    },
                    message: 'لا يمكن أن يبدأ الرقم القومي برقم 0 !'
                }
            ],
        trim: true
    },
    fullName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'رقم الجوال مطلوب!'],
        validate: {
            validator: function (v) {
                return !isNaN(Number(v)) && (v.indexOf('059') == 0 || v.indexOf('056') == 0)
            },
            message: 'رقم الجوال غير صالح'
        },
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    birthDate: {
        type: Date,
        trim: true
    },
    age: {
        type: Number,
    }
    /*
    ,
    gender: {
        type: String,
        enum: {
            values: ['male' , 'female'],
            message: 'الجنس غير صالح!'
        },
        trim: true
    }*/,
    carType: {
        type: String,
        trim: true
    },
    address:{
        type: String,
        trim: true
    },
    tools:{
        type: String,
        trim: true
    },
    position:{
        type: String,
        trim: true
    },
    status:{
        type: String,
        enum:{
            values:['pending' , 'approved' , 'blocked'],
            message:'حالة المستخدم غير صالحة!'
        },
        trim: true
    },
    image:{
        type: String,
        trim: true
    },
    numberOfClosedReport:{
        type: Number,
        trim: true
    },
    rate:{
        type: Number,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User',
        default:null
    },
    updatedBy: {
        type: Schema.Types.ObjectId, ref: 'User',
        default:null
    },

    updatedAt: {
        type: Date,
        default: null
    }


})
userSchema.pre('save', function (next) {
    this.age = moment().diff(this.birthDate, 'years')
    next()
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}



module.exports = mongoose.model('User', userSchema)
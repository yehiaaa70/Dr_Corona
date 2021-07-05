const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/user')


const patientSchema = new mongoose.Schema({
    photo:{
        type:String,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    },
    items:{
        type:String,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    }, 
    status:{
        type:String,
        require:true,
        enum:['postive','negative'],
    },
    date: {
        type: Date,
        require:true,
        default: Date.now
      },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


patientSchema.methods.genrateToken = function () {
    return jwt.sign( { _id:this._id } , 'privet key' ) 
}

const Patient =mongoose.model('Patient', patientSchema )

exports.Patient=Patient;



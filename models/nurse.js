const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/user')


const nurseSchema = new mongoose.Schema({
    address:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    }, 
    appointments:{
        type:String,
        require:true,
    },
    certificate:{
        type:String,
        require:true,
    },
    rate: {
        type: Number,
        default:0   
      },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


nurseSchema.methods.generateTokens = function () {
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},'privateKey')
    return token;
  }


const Nurse =mongoose.model('Nurse', nurseSchema )

exports.Nurse=Nurse;


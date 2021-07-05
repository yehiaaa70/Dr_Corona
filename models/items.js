const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/user')


const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    },
    price:{
        type:Number,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    }, 
    description:{
        type:String,
        require:true,
        trim: true,
        minlength:25,
        maxlength:1024
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


itemSchema.methods.generateTokens = function () {
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},'privateKey')
    return token;
  }


const Item =mongoose.model('Item', itemSchema )

exports.Item=Item;


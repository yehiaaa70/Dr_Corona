const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    },
    phone:{
        type:Number,
        require:true,
        trim: true,
        minlength:11,
        maxlength:20
    },

    email:{
        type:String,
        require:true,
        unique:true,
        trim: true,
        lowercase: true,
        minlength:3,
        maxlength:255
    },
    password:{
        type:String,
        require:true,
        minlength:8,
        maxlength:1024
    },
    type:{
        type:String,
        require:true,
        enum:['Patient','Doctor','Volunteer']
    }
})


userSchema.methods.genrateToken = function () {
    return jwt.sign( { _id:this._id } , 'privet key' ) 
}

const User =mongoose.model('User', userSchema )

exports.User=User;

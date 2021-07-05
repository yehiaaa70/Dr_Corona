const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/user')

const volunterSchema = new mongoose.Schema({
    type: {
        type:String,
        require:true,
        enum:['Nurse','Equipment']
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

const Volunteer =mongoose.model('Volunteer', volunterSchema )


const ItemsSchema = new mongoose.Schema({

    name: {
        type:String,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
      },
      description:{
        type:String, 
        require:true,
        trim: true,
    },
    price:{
        type:Number,
        default:0
    },
    volunter:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Volunteer'
    }
})

const Items =mongoose.model('Items', ItemsSchema )


const nurseSchema = new mongoose.Schema({

    appointments:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        default:0
    },
    hospital_address: {
        type:String,
        require:true,
        },
    volunter:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Volunteer'
    }
})

const Nurse =mongoose.model('Nurse', nurseSchema )


exports.Volunteer=Volunteer;
exports.Items=Items;
exports.Nurse=Nurse;


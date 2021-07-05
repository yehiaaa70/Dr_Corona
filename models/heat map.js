const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/patient')


const heatMapSchema = new mongoose.Schema({
    longitude:{
        type:Number,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    },
    latitude:{
        type:Number,
        require:true,
        trim: true,
        minlength:3,
        maxlength:44
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    }
})


heatMapSchema.methods.generateTokens = function () {
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},'privateKey')
    return token;
  }


const HeatMap =mongoose.model('HeatMap', heatMapSchema )

exports.HeatMap=HeatMap;


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const pharmacySchema = new mongoose.Schema({
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
    }
});

const Pharmacy =mongoose.model('Pharmacy', pharmacySchema )

exports.Pharmacy=Pharmacy;
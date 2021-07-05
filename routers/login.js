const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const joi= require('joi');
const jwt= require('jsonwebtoken');


router.post('/' , async (req,res) => {  
   let user = await User.findOne({email:req.body.email})
   if(!user){
     return res.status(404).send('Invalid email or password');
    }
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword){
        return res.status(404).send('Invalid password');
       }
       const token = user.genrateToken()
         res.header('x-login-auth',token).send(token);
    });

     module.exports =  router;
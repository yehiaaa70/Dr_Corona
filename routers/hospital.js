const express = require('express');
const router = express.Router();
const  {Hospital} = require('../models/hospital')

router.get('/',async(req,res) => {
    const hospital = await Hospital.find();
  res.send(hospital);
  });


router.get('/:id ',async(req,res) => {
      const hospital= await Hospital.findById(req.params.id) 

      if(!hospital){
        res.status(404).send("not found !!");
      }
      res.send(hospital); 
      });

      module.exports=router;


const express = require('express');
const router = express.Router();
const  {Pharmacy} = require('../models/pharmacy')

router.get('/',async(req,res) => {
    const pharmacy = await Pharmacy.find();
  res.send(pharmacy);
  });


router.get('/:id ',async(req,res) => {
      const pharmacy= await Pharmacy.findById(req.params.id) 

      if(!pharmacy){
        res.status(404).send("not found !!");
      }
      res.send(pharmacy); 
      });

      module.exports=router;


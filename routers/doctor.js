const express = require('express');
const router = express.Router();
const  {Doctor} = require('../models/doctor')
const GeneralAuth = require('../middleware/authGeneral')
const bcrypt = require('bcrypt');
const multer = require('multer')
var uniqueImageName

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images')
    },
    limits:{fileSize:147852222},
    fileFilter:function(req,file,cb){
        if(file.originalname.match(/\.(jpg|png|pdf)$/)){
            return cb(new Error('Invalid Extension'))
        }
    },
    filename:function(req,file,cb){
        uniqueImageName = 'Docimage' + '-' +Date.now() +
        file.originalname.match(/\.(jpg|png|jpeg|pdf)$/)[0]
        cb(null,uniqueImageName)
    }
})

var upload = multer({storage})

  router.post('/register',upload.single('certificate'),async (req, res) => {
    const doctor = new Doctor(req.body)
    try {
        
      doctor.certificate = `images/${uniqueImageName}`
        await doctor.save()
        const token = await doctor.generateTokens()
        res.status(200).send({
            status: 1,
            message: 'registerd successfully',
            data: { doctor, token }
        })
    }
    catch (error) {
      console.log('error ..... '+error)

        res.status(500).send({
            status: 0,
            message: 'inserting error',
            data: { error }
        })
    }
  });

router.get('/',async(req,res) => {
    const doctor = await Doctor.find();
  res.send(doctor);
  });


    router.route('/:id').get(async(req,res) => {
      const doctor= await Doctor.findById(req.params.id) 

      console.log(req.params.id)
      if(!doctor){
        res.status(404).send("not found !!");
      }
      res.send(doctor); 
      });


      router.route('/update/:id').put( async(req , res) => {    

        avlUpdates = ["address","price", "appointments", "certificate", "rate"]
        const keys = Object.keys(req.body) 
        const flag = keys.every((k)=> avlUpdates.includes(k))   
        if(!flag) return res.send({
            status:0,
            message:"invalid update keys",
            data:""
        })
        try{
            const doctor = await Doctor.findByIdAndUpdate(
                req.params.userid,
                req.body,
                {runValidators:true}
            )
            if(!doctor) return res.send({
                status:2,
                message: 'user not found',
                data:''
            })
            res.send({
                status:1,
                message:"updated",
                data: doctor
            })
        }
        catch(error){
          console.log(error)
            res.send({
                status:0,
                message: 'error in edit',
                data: {error}
            })
        }
    
    });
    
    router.delete("/delete/:id" ,GeneralAuth, async(req,res) =>{
        const doctor = await Doctor.findByIdAndRemove(req.params.id)
            if(!doctor){
        return res.status(404).send("Not found !!");
        }
        res.send(doctor);
    });
  
    

  module.exports=router;
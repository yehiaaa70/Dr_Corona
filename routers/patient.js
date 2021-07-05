    const express = require('express');
    const router = express.Router();
    const  {Patient} = require('../models/patient')

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
        uniqueImageName = 'Patientimage' + '-' +Date.now() +
        file.originalname.match(/\.(jpg|png|jpeg|pdf)$/)[0]
        cb(null,uniqueImageName)
    }
})

var upload = multer({storage})




      router.post('/register',upload.single('photo'),async (req, res) => {
        const patient = new Patient(req.body)
        try {
            
        patient.photo= `images/${uniqueImageName}`
            await patient.save()
            const token = await patient.genrateToken()
            res.status(200).send({
                status: 1,
                message: 'registerd successfully',
                data: { patient, token }
            })
        }
        catch (error) {
            res.status(500).send({
                status: 0,
                message: 'inserting error',
                data: { error }
            })
        }
      });

    router.get('/',async(req,res) => {
        const patient = await Patient.find();
      res.send(patient);
      });


    router.get('/:id ',async(req,res) => {
          const patient= await Patient.findById(req.params.id) 

          if(!patient){
            res.status(404).send("not found !!");
          }
          res.send(patient); 
          });
    

          router.put("/update/:id" , async(req , res) => {    

            const patient = await Patient.findByIdAndUpdate(req.params.id,{
                name:req.body.name
            },{new:true});
    
            if(!patient){
                return    res.status(404).send("Invalid ID");
            }
            res.send(patient)
        });
        
        router.delete("/delete/:id" , async(req,res) =>{
            const patient = await Patient.findByIdAndRemove(req.params.id)
                if(!patient){
            return res.status(404).send("Not found !!");
            }
            res.send(patient);
        });
      
        

      module.exports=router;
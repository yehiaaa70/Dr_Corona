    const express = require('express');
    const router = express.Router();
    const  {User} = require('../models/user')
    const bcrypt = require('bcrypt');


    router.get('/',async(req,res) => {
        const user = await User.find();
    res.send(user);
    });

    
    
    // router.get('/find/:id', async(req,res)=>{
    //   const  userid = req.params.id
    //     console.log(userid)
    //     try{
    //         userData = await User.findById(userid)
    //         if(!userData) return res.send({
    //             status:2,
    //             message: 'user not found',
    //             data: ''
    //         })
    //         res.send({
    //             status:1,
    //             message: 'user data retriverd',
    //             data: userdata

    //         })
    //     }
    //     catch(e){
    //         res.send({
    //             status:0,
    //             message: 'data retrive error',
    //             data: e
    //         })
    //     }

    // })



    router.get('/:id ',async(req,res) => {
        const user= await User.findById(req.params.id) 
        console.log(req.params.id)
        if(!user){
            res.status(404).send("not found !!");
        }
        res.send(user); 
    });

    router.post('/register',async (req, res) => {
        const user = new User(req.body)
        try {
            
            const salRounds =10;
            const salt =await bcrypt.genSalt(salRounds);
            user.password = await bcrypt.hash(user.password , salt);       

            await user.save()
            const token = await user.genrateToken()
            res.status(200).header('x-user-auth',token).send({
                status: 1,
                message: 'registerd succsessfully',
                data: { user, token }
            })
        }
        catch (error) {
            res.status(500).send({
                status: 0,
                message: 'inserting error',
                data: { error }
            })
        }
    })



    router.put("/update/:id" , async(req , res) => {
        const user = await User.findByIdAndUpdate(req.params.id,{
            name:req.body.name
        },{new:true});

        if(!user){
            return    res.status(404).send("Invalid ID");
        }
        res.send(user)
    });
    
    router.delete("/delete/:id" , async(req,res) =>{
        const user = await User.findByIdAndRemove(req.params.id)
            if(!user){
        return res.status(404).send("Not found !!");
        }
        res.send(user);
    });
    



    module.exports = router;
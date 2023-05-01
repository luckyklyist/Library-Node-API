const User=require('../models/user');
const routes=require('express').Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


routes.post('/register',async(req,res)=>{
    const data=req.body;
    if(!data) return res.status(400);
    try{
        const user=await User.findOne({"email":data.email});
        if(!user){
            
            // decrypt the user
            // const hashPassword=de
            const salt=await bcrypt.genSalt(10);
            const hashPassword=await bcrypt.hash(data.password,salt);
            data.password=hashPassword;
            const newUser=new User(data);
            const savedUser=await newUser.save();
            res.send(savedUser);
        }
        else return res.status(400).send("Email already exists");
    }
    catch(err){
        res.send(err)
    }
})


routes.post('/login',async(req,res)=>{
    const data=req.body;
    if (!data) return res.status(400);
    try{
        const user=await User.findOne({"email":data.email});
        console.log(user)
        if (user){
            // const hashPassword=bcrypt.
            const validPass=await bcrypt.compare(data.password,user.password)
            console.log(validPass)
            if (validPass){
                const token=jwt.sign({'_id':user.id},process.env.SECRET_KEY);
                res.header('auth-token',token).send(token);
            }
            else return res.send("Invalid Email or password");
        }
        else return res.send("Invalid email or password");

    }
    catch(err){
        res.send(err)
    }
})

// routes.post('/login',async(req,res)=>{
//     try{

//     }
//     catch(err){
//         console.log(err)
//     }
// })

module.exports=routes;
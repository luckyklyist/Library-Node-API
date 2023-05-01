const User=require('../models/user');
const jwt=require('jsonwebtoken');

function validateToken(req,res,next){
    token=req.headers['auth-token'];
    if (!token) return res.status(400).send("Acess denied");

    try{
        const verified=jwt.verify(token,process.env.SECRET_KEY);
        req.user=verified;
        next();  
    }
    catch(err){
        res.send(err);
    }
}


function checkPermission(permit){

    return async function(req,res,next){
        const user=await User.findOne({"_id":req.user._id});
        const {role:useRole}=user;
        
        const check=permit.includes(useRole)

        if (!check){
            res.status(403).send({"error msg":"Not allowed"})
        }
        next()

    }

function checkBlockStatus(req,res,next){
    try{
        
    }
    catch(err){
        res.send(err)
    }

}

module.exports={validateToken,checkPermission}
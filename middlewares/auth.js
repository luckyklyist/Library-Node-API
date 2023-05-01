const User=require('../models/user');
const Library=require('../models/library');
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

    }}

async function checkBlockStatus(req,res,next){
    try{
        const isbn=req.params.isbn;
        const book=await Library.findOne({"ISBN":isbn});
        const user=await User.findOne({"_id":req.user._id});
        const {email}=user;
        if (book.blocked_to.includes(email)){
            res.status(403).send("You dont have permissions ")
        }
        else{
            next()
        }
    }
    catch(err){
        res.send(err)
    }

}

module.exports={validateToken,checkPermission,checkBlockStatus};
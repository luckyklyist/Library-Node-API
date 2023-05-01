const User=require('../models/user');
const routes=require('express').Router();
const {checkPermission,validateToken,checkBlockStatus}=require('../middlewares/auth')
const Library=require('../models/library');

routes.post('/block/:isbn',validateToken, async(req,res)=>{
    try{
        const isbn = req.params.isbn;
        const email=req.body.email;

        console.log(isbn,email);

        const book = await Library.findOne({ ISBN: isbn });

        if(book.blocked_to.includes(email)){
            res.status(400).send("User already blocked")
        }
        
        book.blocked_to.push(email);
        await book.save();

        res.status(200).send({ message: 'User blocked successfully.' });
    }
    catch(err){
        res.send(err);
    }
})

routes.post('/unblock/:isbn',validateToken, async(req,res)=>{
    try{
        const isbn = req.params.isbn;
        const email=req.body.email;

        console.log(isbn,email);

        const book = await Library.findOne({ ISBN: isbn });
        console.log(book.blocked_to)
        console.log(email)
        console.log(book.blocked_to.includes(email))

        if(book.blocked_to.includes(email)){
            let index=book.blocked_to.indexOf(email);
            book.blocked_to.splice(index,1)
            await book.save();
        }
        else{
            return res.send({"msg":"no username found"})
        }
        

        res.status(200).send({ message: 'User unblocked successfully.' });
    }
    catch(err){
        res.send(err);
    }
})



module.exports=routes;
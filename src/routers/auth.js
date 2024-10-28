const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const Userauth = require("../middlewares/auth");



authRouter.post("/signup", async(req,res)=>{
    try{
        validateSignUpData(req);
        const {firstName,lastName,email,password,about} = req.body;
        const passwordHash = await bcrypt.hash(password,10);


        const user = new User({
            firstName,
            lastName,
            email,
            about,
            password:passwordHash,
        });
        
        
        await user.save();
        res.send("response send successfully")
       }catch(err){
        res.status(400).send("Error : " +err.message); 
       }
    
    })

authRouter.post("/login", async(req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!email){
        throw new Error("Email id is not present in DB")
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){

        const token = await user.getJWT();
        res.cookie("token",token);
        res.send("login successfull")
    }
    else{
        throw new Error("password is wrong")
    }
   }
   catch(err){
     res.status(400).send("ERROR : " + err.message);
   }
}) 

authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token",null,{ expires: new Date(Date.now())})
        res.send("logout successfully");
}
    catch(err){
       res.status(400).send(err.message)
    }
})
module.exports = authRouter;
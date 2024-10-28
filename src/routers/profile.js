const express = require('express');
const profileRouter = express.Router();
const Userauth = require("../middlewares/auth");
const User = require("../models/user")

const {validateEditProfile} = require("../utils/validation")


profileRouter.get("/profile",Userauth, async(req,res)=>{
    try{
    const user = req.user;
    
    res.send(user); 
    }catch(err){ res.status(400).send("ERROR :  "+ err.message);}
})

profileRouter.patch("/profile/edit",Userauth,async(req,res)=>{
    try{
       if(!validateEditProfile(req)){
            throw new Error("Edit fields are not allowed")
        }
        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((field)=>loggedInUser[field]=req.body[field])
        console.log(loggedInUser)
        res.send("edit successfull")

        req.user.save();
    }
    catch(err){
      res.status(400).send("Error :"+ err.message);
    }
})

module.exports = profileRouter;
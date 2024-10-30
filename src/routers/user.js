const Userauth = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const express = require('express');
const userRouter = express.Router();


userRouter.get("/user/requests",Userauth, async (req,res)=>{
    try{const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status : "interested"
    }).populate("fromUserId", ["firstName","lastName","age","gender","skills","about"])

    res.json({message: " Connection Requests", data :connectionRequests})
    }
    catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
    
})



module.exports = userRouter;
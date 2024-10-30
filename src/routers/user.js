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

userRouter.get("/user/connections",Userauth,async(req,res)=>{
    try{const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        $or:[
            
            {fromUserId:loggedInUser._id ,status : "accepted"},
            {toUserId:loggedInUser._id,status : "accepted"}
        ]
    }).populate("fromUserId", ["firstName","lastName","age","gender","skills","about"])
    .populate("toUserId",["firstName","lastName","age","gender","skills","about"])


     const data = connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.toUserId
     })

     res.json({message:"connections requets", data})

    }
    catch(err){
        res.status(400).send("ERROR :"+err.message)
    }
})


module.exports = userRouter;
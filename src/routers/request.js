const express = require("express");
const Userauth = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");





requestRouter.post("/request/send/:status/:toUserId",Userauth,async (req,res)=>{
    try{
        
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedstatus = ["interested","ignored"]
        if(!allowedstatus.includes(status)){
            return res.status(400).send("Error: status type is not valid")
        }
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send("Error: User is not present in database")
        }
        

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [{
                fromUserId,toUserId},
                {
                    fromUserId : toUserId,toUserId:fromUserId
                }


            ]

            
        })
        if(existingConnectionRequest){
            return res.status(400).send("Error: connection request has already sent")
        }

        

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save();

        res.json({
            message : req.user.firstName + " is " + status + " in" + toUser.firstName,
            data,
        })

    }
    catch(err){
        res.status(400).send(err.message)
    }
})


requestRouter.post("/request/review/:status/:requestId",Userauth,async (res,req)=>{
    
    const loggedInUser = req.user;
    const status = req.params.status;
    const requestId = req.params.requestId;

     const allowedstatus = ["accepted","rejected"];
     if(!allowedstatus.includes(status)){
         return res.status(400).json({message : "Inavlid status type"})
        
     }

    const connectionRequest = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "interested"
    })
    if(!connectionRequest){
        return res.status(400).send("Cannot send connection request")
        
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    
    res.json({message: " Connection request has sent",data})

})


module.exports = requestRouter;
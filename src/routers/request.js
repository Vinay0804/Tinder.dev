const express = require("express");
const Userauth = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/request",Userauth,async (req,res)=>{
    try{const user = req.user;
    res.send(user.firstName + " is sending connection request")}
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = requestRouter;
const jwt = require('jsonwebtoken');
const User = require("../models/user")

const Userauth = async (req,res,next)=>{
   try{const cookies = req.cookies;
   const {token} = cookies;
   if(!token){
    throw new Error("Token is not valid/notpresent")
   }

  
   const decodeduser =  await jwt.verify(token, 'DEV-TINDER@VINAY');

   const { id} =decodeduser;
   const user = await User.findById(id);
   if(!user){
    throw new Error("User not found")
   }
   req.user = user;
   next();
}
catch{
    res.status(400).send("ERROR : "+ err.message)
}
}


module.exports = Userauth;
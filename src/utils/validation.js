
const validator = require('validator');

const validateSignUpData = (req)=>{
  
     const {firstName,lastName,email,password} = req.body;

     if(!firstName || !lastName){
        throw new Error("Enter  valid name");
     }
     else if(!validator.isEmail(email)){
        throw new Error("enter valid email");
    
     }
     else if(!validator.isStrongPassword(password)){
        throw new Error("enter strong password")
     };
}

const validateEditProfile = (req)=>{
   const objectsAllowed = ["firstName","lastName","age","email","gender","about","skills"]
    
   const isUpdatesAllowed = Object.keys(req.body).every((field) =>
    objectsAllowed.includes(field) );

   return isUpdatesAllowed;

}

module.exports = {validateSignUpData,validateEditProfile
    
}

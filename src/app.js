const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require('./utils/validation');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const {Userauth} = require('./middlewares/auth');




app.use(express.json());
app.use(cookieParser());
app.post("/signup", async(req,res)=>{
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

app.post("/login", async(req,res)=>{
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
app.get("/profile",Userauth, async(req,res)=>{
    try{
    const user = req.user;
    
    res.send(user); 
    }catch(err){ res.status(400).send("ERROR :  "+ err.message);}
})
app.get("/requestsent",Userauth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user.firstName + " send request")
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
      }
})

app.get("/user",async(req,res)=>{
    const usermail = req.body.email;
    try{
     const user = await User.find({email:usermail});
     res.send(user);
    }catch{
        res.status(400).send("something went wrong");
    }
})

app.delete("/user",async(req,res)=>{
    username = req.body.firstName
    try{
        await User.deleteMany({firstName:username})
        res.send("succesfully deleted")
    }catch(err){
        res.status(400).send("Error occured"); 
       }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["firstName","lastName","age","gender","about","skills",];
        const isUpdatesAllowed = Object.keys(data).every((k)=>
           ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdatesAllowed){
            throw new Error("Upadates not Allowed")
        }
        if(data.skills.length>25){
            throw new Error("Skills are not allowed")
        }
        const user = await User.findByIdAndUpdate({ _id: userId},data,
            {
             runValidators: true,
        }
    );
        console.log(user);
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("update failed: " + err.message)
    }

});

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(3000,()=>{
        console.log("3000 port is listening")
    })
}).catch((err)=>{
    console.error("Database is not connected");
});



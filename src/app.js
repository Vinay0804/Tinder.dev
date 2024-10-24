const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.use(express.json());


app.post("/signup", async(req,res)=>{
    const user = new User(req.body);
    
    try{ await user.save();
        res.send("response send successfully")
       }catch(err){
        res.status(400).send("Error occured"); 
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



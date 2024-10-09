const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.use(express.json());



app.get("/user",async(req,res)=>{
    const usermail = req.body.email;
    try{
     const user = await User.find({email:usermail});
     res.send(user);
    }catch{
        res.status(400).send("something went wrong");
    }
})


app.post("/signup", async(req,res)=>{
const user = new User(req.body);

try{ await user.save();
    res.send("response send successfully")
   }catch(err){
    res.status(400).send("Error occured"); 
   }

})
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(3000,()=>{
        console.log("3000 port is listening")
    })
}).catch((err)=>{
    console.error("Database is not connected");
});



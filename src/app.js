const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")
const cookieParser = require('cookie-parser');

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request")

app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



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



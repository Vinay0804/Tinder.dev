const server = require("express");
const app = server();


app.use("/hello",(req,res,next)=>{
    console.log("1st response handled");

    //res.send("1st response")
    next();
   
},(req,res,next)=>{
    console.log("2nd respone is handling")
    //res.send("2nd response")
    next();
},(req,res,next)=>{
    console.log("2nd respone is handling")
    //res.send("2nd response")
    next();
},
   (req,res,next)=>{
    console.log("3nd respone is handling")
    res.send("4nd response")
    next()
})



app.listen(3000,()=>{
    console.log("3000 port is listening")
})
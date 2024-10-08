const server = require("express");
const app = server();


app.get("/hello",(req,res)=>{
    res.send({firstname:"Vinay", LastName :"Motapalukula" })
})

app.post("/hello",(req,res)=>{
    res.send("hello hello ")
})
app.delete("/hello",(req,res)=>{
    res.send("successfully deleted ")
})
app.use("/",(req,res)=>{
    res.send("welcome to the server");
})

app.listen(3000)
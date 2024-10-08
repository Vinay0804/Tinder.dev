const server = require("express");
const app = server();

app.get("/",(req,res)=>{
    res.send("Hello from the server");
})
app.get("/hello231/1",(reqqq,reww)=>{
    reww.send("hello from reww")
})

app.get("/hello1",(reqqq,reww)=>{
    reww.send("hello1 from reww")
})


app.listen(3000)
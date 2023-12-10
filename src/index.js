const express=require("express");
const app=express()
const path=require("path")
const hbs=require("hbs");
const collection=require('./db')
// const async = require("hbs/lib/async");

const templatepath=path.join(__dirname,'../templates')
app.use(express.static(path.join(__dirname, "../public")));


app.use(express.json())
app.set("view engine",'hbs')
app.set("views", templatepath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("Register")
})

app.get("/error", (req, res)=>{
    res.send("Error");
})


app.post("/register",async (req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password,

    }


    await collection.insertMany([data])
    res.render("login")
})

app.post("/login",async (req,res)=>{
    

    try{
            const user=await collection.findOne({name:req.body.name,})
            if(user){
                const result=req.body.password===user.password;
                if(result){
                    res.render("home")
                }
                else{
                    res.status(400).json({ error: "password doesn't match" });
                }
            }
            else{
                res.status(400).json({ error: "User doesn't exist" });
            }

        }  
      
    catch(error)
    {
        res.status(400).json({ error });
    }
   
})

app.listen(3003,()=>{
    console.log("connected successfully");
})
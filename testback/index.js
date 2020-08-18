const express = require("express")

const app = express()

const port = 4000

app.get('/',(req,res)=>{
    return res.send('hai')
})

app.get("/login",(req,res)=>{
    return res.send("you are visiting login route")
})
// explaining middle ware
const admin = (req,res)=>{
    return res.send("this is admin dashboard")
}
// isAdmin is customizatable middleware
const isAdmin = (req,res,next) => {
    console.log("is admin is running")
    next()
}

const isloggedIn = (req,res,next)=>{
    console.log("he logged in")
    next()
}

app.get("/admin",isloggedIn,isAdmin,admin)

app.get("/signout",(req,res)=>{
    return res.send("you are visiting signout route")
})

app.get("/signup",(req,res)=>{
    return res.send("you are visiting signup route")
})

app.listen(port,()=>(
    console.log("server is up and running...")
))
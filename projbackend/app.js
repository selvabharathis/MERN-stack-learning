require('dotenv').config()

const mongoose = require("mongoose")
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
//routes import
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")

// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( ()=>{
    console.log("DB CONNECTED")
})

//Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//My Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
//Port
const port = process.env.PORT || 8000

//starting a server
app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})
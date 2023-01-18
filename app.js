const express=require('express')
const mongoose=require('mongoose')
const blogrouter=require('./Routes/blog-router')
const router=require('./Routes/User-routes')
const cors=require('cors')
const movieRoute=require('./Routes/movies-router');

const app=express();
app.use(express.json())

app.use(cors())
app.use("/api/user",router)
app.use("/api/blog",blogrouter)
app.use("/api/movies",movieRoute)
mongoose.connect("mongodb+srv://mushthak:asdf1234@cluster0.qt09tdj.mongodb.net/Blog?retryWrites=true&w=majority")
.then(()=>app.listen(5000)).then(()=>console.log("connected 5000")).catch((err)=>console.log(err))
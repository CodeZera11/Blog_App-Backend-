import express from "express";
import mongoose from "mongoose"
import router from "./routes/user_routes"
import blog_router from "./routes/blog_routes";

const app = express()

app.use(express.json())
app.use("/api/user",router);
app.use("/api/blog",blog_router);

mongoose.connect('mongodb+srv://CaptainGoGo:jzAf192B2KRFAYa4@cluster0.ck26fwh.mongodb.net/Blog').then(()=>{
    app.listen(3000); 
}).then(()=>{
    console.log("Connection Successful")
}).catch((err)=>{
    console.log(err)
})

// jzAf192B2KRFAYa4


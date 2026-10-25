require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app=express();
app.use(cors());
app.use(express.json());
//DataBase connection

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Database connected")).catch((err)=>console.log(err));

//Model
const Note =mongoose.model("NOTE",{title: String,content:String});

//Routes
app.get("/api/notes",async(req,res) =>{res.json(await Note.find());});
app.post("/api/notes",async(req,res) =>{const note = await Note.create(req.body);res.json(note);});
app.delete("/api/notes/:id",async(req,res) =>{await Note.findByIdAndDelete(req.params.id);res.json({message:"Note deleted"});});

//server
app.listen(process.env.PORT,()=>console.log("SERVER RUNNING"));
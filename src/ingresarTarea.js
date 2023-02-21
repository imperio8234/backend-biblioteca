const express=require("express");
const tarea=express.Router();


tarea.get("/", (req, res)=>{
 res.send("aaasdstareadad")
})



module.exports=tarea;
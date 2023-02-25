const express=require("express");
const verificar = require("./controllers/token");
const cerrar=express.Router();



cerrar.post("/", (req,res)=>{
    
    req.session.destroy();
    res.status(200).json({
        cerrar:true,
    });

   
    

    

})

module.exports=cerrar;
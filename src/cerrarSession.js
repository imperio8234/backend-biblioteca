const express=require("express");
const cerrar=express.Router();



cerrar.post("/", (req,res)=>{
    
    req.session.destroy();
    res.status(200).json({
        cerrar:true,
    });

    console.log(req.session)
    

    

})

module.exports=cerrar;
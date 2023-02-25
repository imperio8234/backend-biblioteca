const express=require("express");
const eliminar=express.Router();
const coneccion=require("./controllers/conexion");
const fs=require("fs");
const path=require("path");
const { parse } = require("path");




eliminar.delete("/eliminar/:id/:name", (req, res)=>{
    const obdelete=req.params.name;
    console.log( obdelete)
    const id=req.params.id;
    

   




    coneccion.query("DELETE FROM tarea WHERE id = ? ", [id], (err, result)=>{
        if(err){
            res.status(401).json({
                mensaje:"no se pudo eliminar"
            })
        }else{
            fs.unlink(path.join(__dirname,"../imagenes/"+id + obdelete), (err)=>{
                
                if (err) {
                    console.log ("no se pudo eliminar");
                    
                }
            })
            console.log(__dirname)
            res.status(200).json({
                success:true,
                mensaje:"se elimino correctamente"
            })
        }

    })

})


module.exports=eliminar;
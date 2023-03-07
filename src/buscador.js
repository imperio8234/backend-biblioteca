const buscar=require("express").Router();
const conec=require("./controllers/conexion");
const verificar=require("./controllers/token");
const path =require("path");
const fs=require("fs")


buscar.get("/:nombre",verificar, (req, res)=>{
    const id_user =req.usuario.id;
    const nombre= req.params.nombre;
    conec.query("SELECT * FROM tarea WHERE nombre LIKE ? AND id_user = ?", [`%${nombre}%`, id_user], (err, result)=>{
        if (err) {
            console.log("nos se pudo encontrar")
        }else{
            if (result) {
                
                res.json({
                    resultado: result.map(e=>{
                       return {
                        id:e.id,
                        nombre:e.nombre,
                        descripcion: e.descrip
                       }

                    })
                })
               
                
            }else{
                console.log("no se encontro ningun archivo")
            }
        }
    })

});



module.exports=buscar;
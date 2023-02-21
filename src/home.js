const express=require("express");
const home=express.Router();
const fs=require("fs");
const path = require("path");
const coneccion=require("./controllers/conexion")
/*
home.post("/", (req,res)=>{
    coneccion.query("DELETE FROM usuarios", (err,rows)=>{
        if(err){
            console.log("no se pudo borrar")
        }else{
            console.log("se booro la tabla")
        }
    })

})*/





home.get("/",async (req, res)=>{
 const usuario= await req.session.usuario;


 console.log(usuario)



 req.getConnection((err, coneccion)=>{
    if (err) {
        res.status(401).json({
            success:false,
            message:"no hay coneccion",
           
           })
    }else{
        coneccion.query("SELECT * FROM tarea WHERE id_user= ?",[req.session.pass], async (err, results)=>{
            if (err) {
                res.status(401).json({
                    success:false,
                    message:"no se accedio a los datos ",
                   
                   })
            }else{
                if (results.length== 0) {
                    res.status(404).json({
                        message:"no hay ningun archivo"
                    });
                    
                }else{
                    // se obtienen las imagenes para mostrarlas en el cliente con fs
                results.map(e=>{
                    const imagenUrl = path.join(__dirname,"../imagenes/" + e.id + e.nombre);
                    const tareaConImagen = {
                        id: e.id,
                        nombre: e.nombre,
                        descripcion: e.descrip,
                        tipo:e.tipo,
                        url: imagenUrl
                    };
                    fs.writeFileSync(imagenUrl, e.url);
                    return tareaConImagen;
                });

                const docImagenes=fs.readdirSync(path.join(__dirname,"../imagenes"));
                
                res.status(200).json({
                    success:true,
                    result:{
                        datos: results,
                        tareasConImagenes: results.map(e => {
                            return {
                                id: e.id,
                                nombre: e.nombre,
                                descripcion: e.descrip,
                                tipo:e.tipo,
                                url: path.join(__dirname,"../imagenes/" + e.id + e.nombre),
                                usuario:usuario
                            };
                        }),
                        urlImage: docImagenes,
                        user:usuario
                    }
                });

                }
               
            }
        })
    }
 })
 
})



module.exports=home;
const express=require("express");
const home=express.Router();
const fs=require("fs");
const path = require("path");
const coneccion=require("./controllers/conexion");
const verificar = require("./controllers/token");
const cors =require("cors");

/*
home.post("/", (req,res)=>{
    coneccion.query("DELETE FROM perfiles", (err,rows)=>{
        if(err){
            console.log("no se pudo borrar")
        }else{
            console.log("se booro la tabla")
        }
    })

})*/

const corsOptions = {
    origin: ['http://localhost:3000',"https://biblioteca-v2-2023.netlify.app", "https://biblioteca-v2-2023.netlify.app/login/contenido"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

home.use(cors(corsOptions));

home.get("/", verificar,async (req, res)=>{
 const usuario= await req.session.user;
 const nombreDe=req.usuario.id;
 






 req.getConnection((err, coneccion)=>{
    if (err) {
        res.status(401).json({
            success:false,
            message:"no hay coneccion",
           
           })
    }else{
        coneccion.query("SELECT * FROM tarea WHERE id_user= ?",[nombreDe], async (err, results)=>{
            if (err) {
                res.status(401).json({
                    success:false,
                    message:"no se accedio a los datos ",
                   
                   })
            }else{
                if (results.length== 0) {
                    res.status(404).json({
                        message:"no hay ningun archivo",
                        user:usuario
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
                    if(e.url){
                        fs.writeFileSync(imagenUrl, e.url);
                    }
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
                                usuario:nombreDe
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
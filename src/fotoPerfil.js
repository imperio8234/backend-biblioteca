const foto=require("express").Router();
const multer=require("multer");
const fs=require("fs");
const verificar=require("./controllers/token");
const mimetypes=require("mime-types");
const path = require("path");
const conecc=require("./controllers/conexion");




const storage=multer.diskStorage({
    destination:'imgPerfil/',
    filename:(req, file, cb)=>{
        cb(null, Date.now() + "." + mimetypes.extension(file.mimetype));
    }
});

const uploads=multer({
    storage:storage,
})

foto.put("/", verificar, uploads.single("foto"), (req, res)=>{

    const id_user =req.usuario.id;
    const filename= req.file.filename;
    const nombre= req.file.originalname;
    const tipo= req.file.mimetype;
    
    const foto=fs.readFileSync(path.join(__dirname, "../imgPerfil/" + filename ));
    conecc.query("SELECT * FROM Perfiles WHERE id_user = ? ", [id_user], (err, result)=>{
        if (err) {
            console.log("error a conectar")
        } else {
            if(result.length === 0){
                console.log("hay ")
                
                conecc.query("INSERT INTO perfiles SET ?", [{nombre:nombre, tipo:tipo, foto:foto, id_user:id_user}], (err, result)=>{
                    if (err) {
                        console.log("no se pudo modificar")
                    }else{
                             fs.unlink(path.join(__dirname, "../imgPerfil/" + filename), (err)=>{
                                if (!err) {
                                }
                                res.json({
                                    success:true,
                                    message:"se guardo exitosamente"
                                })
            
            
                             });
                    };
                });
            }else{
                conecc.query("UPDATE perfiles SET nombre=?, tipo=?, foto=? WHERE id_user =? ", [nombre, tipo, foto, id_user], (err, result)=>{
                    if (err) {
                        console.log("nose pudo actualizar")
                        
                    }else{
                       
                        fs.unlink(path.join(__dirname, "../imgPerfil/" + filename), (err)=>{
                            if (!err) {
                            }
                            res.json({
                                success:true,
                                mensaje:"se actualizo correctamente"
                            });
        
        
                         });
                    }
                })
            }
            
        }

    })

   
});



foto.get("/", verificar, (req, res)=>{
    const id=req.usuario.id;

    conecc.query("SELECT * FROM perfiles WHERE id_user = ?", [id], (err, result)=>{
        if (err) {
            console.log("problema al optener los resultados")
        } else {
            if (result.length > 0) {
    
                const nombre=result[0].nombre;
                const id=result[0].id;
                const foto=result[0].foto;
                const direc=path.join(__dirname, "../getfotoperfil/" + id + nombre)

                fs.writeFileSync(direc, foto);

                res.json({
                    nombre:nombre,
                    id:id
                });             

            
                
            } else {
                console.log("no se encontro ningun usuario")
                
            }
        }
    })


})




module.exports=foto;

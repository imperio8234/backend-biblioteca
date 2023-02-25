const express=require("express");
const fs=require("fs");
const upload=express.Router();
const multer=require("multer");
const  mimetypes=require("mime-types");
const pat = require("path");
const verificar = require("./controllers/token");







const storage=multer.diskStorage({
    destination:'upload/',
    filename:(req, file, cb)=>{
        cb("", Date.now()+"." + mimetypes.extension(file.mimetype));
    }

})

const uploads=multer({
    storage:storage
})

upload.post("/",verificar, uploads.fields([{name:"file"}, {name:"des"}]), (req, res)=>{
    
    const { originalname, mimetype, filename }=req.files["file"][0];
    const descripc=req.body["des"];
    const bynaryD=fs.readFileSync(pat.join(__dirname, "../upload/" + filename))

    const id_user=req.usuario.id;
    req.getConnection((err, coneccion)=>{
        if (err) {
            res.send("no hay conexion")
        }else{
            coneccion.query("INSERT INTO tarea SET ?",[{descrip:descripc,tipo:mimetype, nombre:originalname, id_user:id_user}], (err, row)=>{
                if(err){
                    res.send("no se pudo guardar")
                }else{
                    res.send("se guardo exitosamente")
                }
            })
        }
    })


})

module.exports=upload;
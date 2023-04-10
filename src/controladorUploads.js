const express = require("express");
const fs = require("fs");
const multer = require("multer");
const mimetypes = require("mime-types");
const pat = require("path");

const verificar = require("./controllers/token");
const connection = require("./controllers/conexion");

const upload = express.Router();

// Configuración del almacenamiento para multer
const storage = multer.diskStorage({
  destination: 'upload/',
  filename: (req, file, cb) => {
    cb("", Date.now() + "." + mimetypes.extension(file.mimetype));
  }
});

// Middleware de multer para la subida de archivos
const uploads = multer({
  storage: storage
});

// Ruta para la subida de archivos
upload.post("/", verificar, uploads.fields([{name:"file"}, {name:"des"}]), async (req, res) => {
  
  try {
    // Obtener la información del archivo subido y la descripción
    const { originalname, mimetype, filename } = await req.files["file"][0];
    const descripc = await req.body["des"];
    
    // Leer el archivo subido en formato binario
    const bynaryD = fs.readFileSync(pat.join(__dirname, "../upload/" + filename));
    
    // Obtener el ID del usuario autenticado
    const id_user = req.usuario.id;
    
    // Insertar los datos en la base de datos
    connection.query("INSERT INTO tarea SET ?", [{
      descrip: descripc,
      tipo: mimetype,
      nombre: originalname,
      url: bynaryD,
      id_user: id_user
    }], (err, row) => {
      if (err) {
        res.send("No se pudo guardar");
      } else {
        res.send("Se guardó exitosamente");
        // Eliminar el archivo subido del servidor
        fs.unlink(pat.join(__dirname, "../upload/" + filename), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Archivo eliminado exitosamente");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Ocurrió un error al subir el archivo");
  }

});

module.exports = upload;

const update=require("express").Router();
const coneccion =require("./controllers/conexion");

update.post("/update/:id", (req, res)=>{
    const id =req.params.id;
    coneccion.query("UPDATE FROM tarea WHRE id =?", [id])
})



module.exports=update;
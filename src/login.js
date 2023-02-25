const express=require("express");
const login=express.Router();
const bcrypt=require("bcryptjs");
const coneccion=require("./controllers/conexion");
const jwt = require("jsonwebtoken");




login.post("/", async (req, res)=>{
    const user= await req.body.usuario;
    const pass= req.body.pass;
      
            coneccion.query("SELECT * FROM usuarios WHERE usuario = ?",[user], async (err, result)=>{
                if(err){
                    res.send("no se encontro ningun usuario")
                }else{
                   if(result== ""){
                    res.status(404).json({
                        success:false,
                        message:"no existe el usuario",
                       
                       })

                   }else{
                    const password= await result[0].pass;
                  const comparacion= await bcrypt.compare(pass, password )
                  if (comparacion) {
                   // se agrega el token co jwt
                    const userToken={
                      usuario:user,
                      id:result[0].id
                    }
                    const token_jwt=jwt.sign(userToken, "ESTE_ES_UN_SECRETO", {expiresIn: "24h"});
                   res.status(200).json({
                    success:true,
                    message:"ingreso correctamente",
                    user:token_jwt,
                    usuario:user
                   });
                   //  se origina el token en una cookie
                   //res.cookie("token",token_jwt, {httpOnly:true, expires: new Date(Date.now() +60 * 60 *1000)});
                
                  }else{
                    res.status(401).json({
                        success:false,
                        message:"contraseña o usuario incorrecta",
                       
                       })
                   
                  }
            

                   }
                }
            } )
        
    
    

})



module.exports=login;
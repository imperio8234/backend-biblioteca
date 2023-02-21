const express=require("express");
const login=express.Router();
const bcrypt=require("bcryptjs");
const coneccion=require("./controllers/conexion");






login.post("/", async (req, res)=>{
    const user= await req.body.usuario;
    const pass= req.body.pass;
    req.session.usuario=user;
  //  req.sessionStore=user;
  if (req.session) {
    console.log("seccion abierta")
    
  }else{
    console.log("seccion abierta")
  }
 
    
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
                    req.session.usuario=user
                    req.session.pass=result[0].id
                    console.log(req.session)
                   res.status(200).json({
                    success:true,
                    message:"ingreso correctamente",
                    user:req.session.usuario
                   });
                
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
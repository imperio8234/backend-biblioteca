const cambio=require("express").Router();
const coneccion=require("./controllers/conexion");
const bcrypt=require("bcryptjs");

cambio.post("/", async (req,res)=>{
    const usuario= await req.body.user;
    const password= await req.body.pass;
    const newPass= await req.body.newPass;

    const pass=await bcrypt.hash(newPass,8);
    

    coneccion.query("SELECT * FROM usuarios WHERE usuario = ?",[usuario],async  (err, result)=>{
        if(err){
            console.log("error al conectar con la base de datos")
        }else{
            if (result.length==0) {
                res.status(404).json({
                    success:false,
                    message:"no hay ningun usuario"
                })
                
            }else{
                const comparePass= await result[0].pass;
                const compare= await bcrypt.compare(password,comparePass);

                if (compare) {
                    //como el usuario si coincide se procede a cambiar la contraseña
                    coneccion.query("UPDATE usuarios SET pass=? WHERE usuario = ?",[pass, usuario], async (err,rows)=>{
                        if (err) {
                            console.log("no se guardo")
                            
                        }else{
                            res.status(200).json({
                                message:"cambio de contraseña exitoso",
                                usuario:usuario,
                            })
                        }

                    })
                    
                }else{
                    
                    res.json({
                        success:false,
                        message:"contraseña mala"
                    })
                }


            }
        }

    })


});



module.exports=cambio
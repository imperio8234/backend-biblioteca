const cambio=require("express").Router();
const coneccion=require("./controllers/conexion");
const bcrypt=require("bcryptjs");

cambio.get("/", (req, res)=>{
    res.send("hola quieres cambiar ")
})

cambio.post("/", async (req,res)=>{
    const email= await req.body.email;
    const password= await req.body.pass;
    
    const pass=await bcrypt.hash(password,8);
    

    coneccion.query("SELECT * FROM usuarios WHERE email = ?",[email],async  (err, result)=>{
        if(err){
            console.log("error al conectar con la base de datos")
        }else{
            console.log(result)
            if (result.length > 0) {
                 //como el usuario si coincide se procede a cambiar la contraseña
                 coneccion.query("UPDATE usuarios SET pass=? WHERE email = ?",[pass, email], async (err,rows)=>{
                    if (err) {
                        console.log("no se guardo")
                        
                    }else{
                        res.status(200).json({
                            message:"cambio de contraseña exitoso",
                            usuario:email,
                        })
                    }

                });
                
                
            }else{
                   
                    res.status(404).json({
                    success:false,
                    message:"no hay ningun usuario"
                })
               


            }
        }

    })


});



module.exports=cambio
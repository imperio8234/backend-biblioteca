const express=require("express");
const registro=express.Router();
const bcryptjs=require("bcryptjs");


registro.post("/", async(req, res)=>{

    const user=req.body.usuario;
    let password=req.body.pass
    const email=req.body.email;
    let pass= await bcryptjs.hash(password, 8);
    

// se establece la coneccion con la base de datos
   req.getConnection((err, conn)=>{
    if(err){
       console.log("error al conectar")
    }else{
        // se comprueba si el usuario existe 
        conn.query("SELECT * FROM usuarios WHERE email=? OR usuario =?", [email, user], (err, result)=>{
            if(err){
                res.send("error en la consulta");
            }else{
                // si los resultados de la comprobacion son mayores a cero conincidencias no se registra de lo contrario si
                
                if(result.length > 0){
                    res.status(401).json({
                        success:false,
                        message:"el usuario ya existe",
                       
                       })

                }else{
                    // si el usuario no existe se procede a registrarse
                    conn.query("INSERT INTO usuarios SET ?", [{usuario:user, pass:pass, email:email}],(err, rows)=>{
                        if(err){
                            console.log("error no se guardo")
                        }else{
                            res.status(200).json({
                                success:true,
                                message:"registro exitoso",
                               
                               })
                        }
                    })
                    
                }
            }
        })
       
    }
    
   })
});




module.exports=registro;
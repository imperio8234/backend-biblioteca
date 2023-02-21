const express=require("express")
const logPass=express.Router();
const passport=require("passport");
const passportLocal=require("passport-local").Strategy;
const coneccion=require("./controllers/conexion");
const encryp=require("bcryptjs");


//configuracion de estrategia 


passport.use( new passportLocal( async (req,usuario,pass,done)=>{
    coneccion.query("SELECT * FROM usuarios WHERE usuario= ?",[usuario], async(err, result)=>{
        console.log(result)
        if(err) return done(err);
        if(!result.length){
            return done(null, false,req.flash('loginMessage', 'oops your user is not found '));
        }else{
           const contra = await result[0].pass;
           const comparar=await encryp.compare(pass, contra);
           if (comparar) {
            done(null,result[0])
           }else{
            done(null, false, req.flash("loginMessage", "Oops password or username undefined"))
           }
            
        }
                
        


    })

}));

passport.serializeUser((user, done)=>{
    done(null, user.id);

});

passport.deserializeUser((id, done)=>{
    coneccion.query("SELECT * FROM usuarios WHERE id =?", [id],(err, rows)=>{
        done(err, rows[0])

    });

});


logPass.post("/", passport.authenticate("local",{
    failureRedirect:"/login",
    failureRedirect:"/",
    failureFlash: true
}))





module.exports=logPass;
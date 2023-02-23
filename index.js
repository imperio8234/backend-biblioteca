const express=require("express");
const app=express();
const mysql=require("mysql2");
const mysql23=require("mysql")
const coneccion=require("express-myconnection");
const mysession=require("express-mysql-session");
const session=require("express-session");
const cors=require("cors");
const cookiParser=require("cookie-parser");
const passport=require("passport");
const passportLocal=require("passport-local").Strategy;
const flash=require("connect-flash");
require("./src/loginPassport");
const path=require("path");

const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
//coneccion con la base de datos
const options={
    host:"localhost",
    user:"root",
    password:"imperio8234",
    port:3306,
    database:"tareas"
};

app.use(coneccion(mysql ,options, "single"));


//midelwere
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname,"imagenes")))




//midelwhere para guardar imagenes o videos 


// coneccion secciones 

let sessionstorage= new mysession(options);

app.set("trust proxi", 1)
app.use(session({
    secret:"ESTE_ES_UN_SECRETO",
    //store:sessionstorage,
    resave:true,
    saveUninitialized:true,
    cookie:{secure:false, maxAge:86400000}
    
    
}));
app.use(passport.initialize())
app.use(passport.session());
app.use(flash());
//conexion con passport 
app.use(cookiParser("ESTE_ES_UN_SECRETO"));





// router
const registro=require("./src/registrarse");
app.use("/",registro);
const login=require("./src/login");
app.use("/login",login);
const home=require("./src/home");
app.use("/login/home",home);
const ingresarTarea=require("./src/ingresarTarea");
app.use("/login/home/tarea",ingresarTarea);

const upload=require("./src/controladorUploads");
app.use("/login/home/tarea/upload", upload)
const cerrar=require("./src/cerrarSession");
app.use("/cerrar", cerrar)

//delete
const eliminar=require("./src/delete");
app.use("/login/home", eliminar);
const update=require("./src/delete");
app.use("/login/home", update);

//cambio de contraseña
const cambio=require("./src/restableserPass");
app.use("/login/cambio", cambio);

//pasport logi

const passLog=require("./src/loginPassport");
app.use("/login/home/tarea/upload/passport",passLog)

// exportaciones



const PUERTO=process.env.PORT || 4000;

app.listen(PUERTO, ()=>{
    console.log(`se esta escuchando en el puerto ${PUERTO}`)
})


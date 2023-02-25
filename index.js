const express=require("express");
const app=express();
const mysql=require("mysql2");
const coneccion=require("express-myconnection");
const mysession=require("express-mysql-session");
const session=require("express-session");
const cors=require("cors");
const cookiParser=require("cookie-parser");
const passport=require("passport");
const flash=require("connect-flash");
require("./src/loginPassport");
const path=require("path");
// variables de entorno para desplegar 
const  DB_HOST= process.env.DB_HOST || "localhost";
const DB_USER= process.env.DB_USER || "root";
const DB_PASSWORD= process.env.DB_PASSWORD || "imperio8234";
const DB_NAME =process.env.DB_NAME || "tareas";
const DB_PORT =process.env.DB_PORT || 3306;

const PORT= process.env.PORT || 4000


  // configuracion cors 
 /* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://63f9b75b771c47646038e9b8--elegant-mochi-c69a2d.netlify.app")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });// configuracion cors*/

const corsOptions = {
    origin: ['http://localhost:3000', "https://repobiblioteca-production.up.railway.app/", "https://63f9b75b771c47646038e9b8--elegant-mochi-c69a2d.netlify.app","https://63f9b75b771c47646038e9b8--elegant-mochi-c69a2d.netlify.app/login"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
   // exposedHeaders: ['Access-Control-Allow-Origin']
   
  };

//coneccion con la base de datos
const options={
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    database:DB_NAME
};

app.use(coneccion(mysql ,options, "single"));


//midelwere
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname,"imagenes")))




//midelwhere para guardar imagenes o videos 

const addCorsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://63f9b75b771c47646038e9b8--elegant-mochi-c69a2d.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  };

app.use(addCorsHeaders)

app.set("trust proxi", 1)
app.use(session({
    secret:"ESTE_ES_UN_SECRETO",
    //store:sessionstorage,
    resave:true,
    saveUninitialized:true,
    cookie:{secure:true, maxAge:86400000}
    
    
}));

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

app.get("/api", (req, res)=>{
    res.json("hola esta es tu app")

})



app.listen(PORT)


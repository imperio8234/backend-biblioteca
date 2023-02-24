const  DB_HOST= process.env.DB_HOST || "localhost";
const DB_USER= process.env.DB_USER || "root";
const DB_PASSWORD= process.env.DB_PASSWORD || "imperio8234";
const DB_NAME =process.env.DB_NAME || "tareas";
const DB_PORT =process.env.DB_PORT || 3306;

const mysql=require("mysql2");


const connection = mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    database:DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida con éxito');
});

module.exports = connection;

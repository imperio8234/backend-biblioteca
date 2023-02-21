const mysql=require("mysql2");


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'imperio8234',
  database: 'tareas'
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida con éxito');
});

module.exports = connection;

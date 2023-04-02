CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario varchar(200) NOT NULL,
    pass varchar(300) NOT NULL
)


CREATE TABLE tarea (
   id INT PRIMARY KEY AUTO_INCREMENT,
    tipo varchar(200) NOT NULL,
    nombre varchar(200) NOT NULL,
    url LONGBLOB, 
    descrip varchar(400),
    id_user varchar(45) NOT NULL
)

CREATE TABLE perfiles (
   id INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(500),
    tipo varchar(500),
    foto LONGBLOB, 
    id_user varchar(400),
     
)




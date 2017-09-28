#Tabla de usuarios
CREATE TABLE Usuarios(
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    accesskey VARCHAR(50) NOT NULL
);

INSERT INTO Usuarios(firstName, lastName, username, accesskey) 
VALUES  ('Luis', 'Rojo', 'elrojo96', '12345'), 
        ('Mike', 'Alvarado', 'seiya', '67890'), 
        ('Alfredo', 'Salazar', 'mscalfredo', 'daw2026'), 
        ('Nicholas', 'Zakas', 'nzakas', 'ajax123'), 
        ('Rasmus', 'Lerdorf', 'phpCreator', 'php123');

#Tabla de chefs
CREATE TABLE Chefs(
    chef_ID INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    edad INT NOT NULL,
    tipo VARCHAR(30) NOT NULL
);

INSERT INTO Chefs(chef_ID, nombre, apellidos, edad, tipo) 
VALUES  (10001, 'Julieta', 'Gomez Perez', 27, 'Chef Ejecutivo'),
        (10002, 'Rodolfo', 'Lopez Bustamante', 34, 'Sous Chef'),
        (10003, 'Andres', 'Garza Santos', 42, 'Senior Chef');

#Tabla de especialidades
CREATE TABLE Especialidades(
    especialidad_ID INT NOT NULL,
    chef_ID INT NOT NULL,
    especialidad VARCHAR(20) NOT NULL,
    clave CHAR(2) NOT NULL,
    
    PRIMARY KEY (especialidad_ID, chef_ID),
    FOREIGN KEY (chef_ID) REFERENCES Chefs(chef_ID) 
);

INSERT INTO Especialidades(especialidad_ID, chef_ID, especialidad, clave) 
VALUES  (321, 10001, 'Chef Saucier', 'CS'),
        (322, 10001, 'Chef Grillardin', 'CG'),
        (323, 10001, 'Chef Friturier', 'CF'),
        (324, 10002, 'Chef Rotisseur', 'CR'),
        (325, 10002, 'Chef Entremetier', 'CE'),
        (326, 10003, 'Chef Poissonier', 'CP'),
        (327, 10003, 'Chef Tournant', 'CT'),
        (328, 10003, 'Garde Manager', 'GM'),
        (329, 10003, 'Chef Bouchier', 'CB'),
        (320, 10003, 'Chef Patissier', 'PT');

#Tabla de comentarios
CREATE TABLE Comentarios(
    comentario_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    comentario VARCHAR(200) NOT NULL,
    
    FOREIGN KEY (username) REFERENCES Usuarios(username)
);

INSERT INTO Comentarios(comentario_ID, username, correo, comentario) 
VALUES  (1, 'elrojo96', 'elrojo96@hotmail.com', 'Hamburgesas con muy buen sabor!'),
        (2, 'seiya', 'seiya@gmail.com', 'Las mejores hamburguesas de la ciudad!'),
        (3, 'mscalfredo', 'mscalfredo@gmail.com', 'La hamburguesa Tabasco es la mejor!'),
        (4, 'nzakas', 'nzakas@ajax.com', 'Viaje 15 horas solo para probarlas!'),
        (5, 'phpCreator', 'phpCreator@database.com', 'La hamburguesa clásica tiene un sabor sin igual!');

#Tabla nueva para el laboratorio 5
CREATE TABLE Ordenes(
    orden_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    tipoHamburguesa VARCHAR(20) NOT NULL,
    tipoPan VARCHAR(20) NOT NULL,
    aderezos VARCHAR(20) NOT NULL,
    cantidad VARCHAR(20) NOT NULL,
    estado  VARCHAR(20) NULL
);

INSERT INTO Ordenes(username, nombre, tipoHamburguesa, tipoPan, aderezos, cantidad, estado)
VALUES ('elrojo96', 'Luis Alfonso', 'Sencilla', 'Blanco', 'No', '1', 'Terminada');
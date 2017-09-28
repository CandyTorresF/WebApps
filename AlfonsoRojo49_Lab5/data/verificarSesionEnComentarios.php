<?php
    #echo "La verificación de sesión en comentarios ha cargado correctamente";
    #echo json_encode("Se insertó el comentario en la base de datos.");
    
    header('Accept: application/json');
    header('Content-type: application/json');

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "MrBurger";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn -> connect_error){
        header("HTTP/1.1 500 Bad Connection to the DataBase");
        die("The servers is down, please try again later.");
    }else{
        
        $uCorreoComentario = $_POST["uCorreoComentario"];
        $uComentarioComentario = $_POST["uComentarioComentario"];
        
        //Comprobación de que el correo y el comentario si llegaron enviandolos de nuevo
        //echo json_encode(array("correo" => $uCorreoComentario, "comentario" => $uComentarioComentario));
        
        if (isset($_COOKIE["username"]) && isset($_COOKIE["passwrd"]))
	    {   
            $usuarioInsertar = $_COOKIE["username"];
            
            //Comprobación de que se está obteniendo el usuario correctamente
            //echo json_encode(array("usuario" => $usuarioInsertar));
            
            //Obtener el correo, nombres y apellidos del usuario *****NO UTILIZADO POR EL MOMENTO*****
            $sqlObtenerNombre   =  "SELECT firstName, lastName FROM Usuarios WHERE username = " .$usuarioInsertar."";
            $sqlObtenerApellido =  "SELECT lastName, lastName FROM Usuarios WHERE username = " .$usuarioInsertar."";
            
            $sqlInsert =    "
                                INSERT INTO Comentarios(username, correo, comentario) 
                                VALUES  ('$usuarioInsertar', '$uCorreoComentario', '$uComentarioComentario')
                            ";
            
            //Comprobación para ver lo que contienen la Query
            //echo json_encode(array("usuario" => $usuarioInsertar, "correo" => $uCorreoComentario, "comentario" => $uComentarioComentario));
            
            if(mysqli_query($conn, $sqlInsert)){
                echo json_encode(array("nombre" => $sqlObtenerNombre, "apellido" => $sqlObtenerApellido));    
            }
            
        }
    }
?>
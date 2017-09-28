<?php
    #echo "La verificación de sesión en comentarios ha cargado correctamente";
    #echo json_encode("Se insertó el comentario en la base de datos.");
    
    header('Accept: application/json');
    header('Content-type: application/json');

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "AlfonsoRojo49";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn -> connect_error){
        header("HTTP/1.1 500 Bad Connection to the DataBase");
        die("The servers is down, please try again later.");
    }else{
        
        if (isset($_COOKIE["username"]) && isset($_COOKIE["passwrd"]))
	    {   
            $usuario = $_COOKIE["username"];
            
            $sql   =    "
                            SELECT firstName, lastName
                            FROM Usuarios
                            WHERE username = '$usuario'
                        ";
            
            $result = $conn -> query($sql);

            if($result -> num_rows > 0){
                
                while($row = $result -> fetch_assoc()){
                    $response[] = array("firstName" => $row["firstName"], "lastName" => $row["lastName"]);
                    
                }
                
                echo json_encode($response);
                //echo json_encode($response);
            }
        }
    }
?>
<?php
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
        //echo "El PHP de los comentarios se ha cargado correctamente.";
        
        
        $sql =  "
                SELECT firstName, lastName, comentario
                FROM Usuarios U INNER JOIN Comentarios C
                WHERE U.username = C.username
                ";
        
        //echo $sql;
        
        $result = $conn -> query($sql);
        
        //Echos' para comprobar que si se hizo la selección de comentarios correctamente
        /*
        while($row = $result->fetch_assoc()){
            echo "Correo: " . $row["correo"];
            echo "\r\n";
            echo "Comentario: "  . $row["comentario"];
            echo "\r\n";
            echo "\r\n";
        }
        */
        
        
        while($row = $result -> fetch_assoc()){
            $response[] = array("firstName" => $row["firstName"], "lastName" => $row["lastName"], "comentario" => $row["comentario"]);   
        }
        
        echo json_encode($response);
        
    }
?>

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
        //echo "El PHP de los chefs se ha cargado correctamente.";
        
        $sql =  "
                    SELECT nombre, apellidos, edad, tipo, clave, especialidad
                    FROM Chefs C JOIN Especialidades E
                    ON C.chef_ID = E.chef_ID;
                ";
        
        //echo $sql;
        
        $result = $conn -> query($sql);
        /*
        while($row = $result->fetch_assoc()){
            echo "Nombre: " . $row["nombre"];
            echo "\r\n";
            echo "Apellidos: " . $row["apellidos"];
            echo "\r\n";
            echo "Edad: " . $row["edad"];
            echo "\r\n";
            echo "Tipo" . $row["tipo"];
            echo "\r\n";
            echo "Clave: " . $row["clave"];
            echo "\r\n";
            echo "Especialidad: " . $row["especialidad"];
            echo "\r\n";
            echo "\r\n";
        }
        */
        
        while($row = $result -> fetch_assoc()){
            $response[] = array(
                                "nombre"        => $row["nombre"],
                                "apellidos"     => $row["apellidos"],
                                "edad"          => $row["edad"],
                                "tipo"          => $row["tipo"],
                                "clave"         => $row["clave"],
                                "especialidad"  => $row["especialidad"]
                                );
        }
        
        echo json_encode($response);
    }
?>

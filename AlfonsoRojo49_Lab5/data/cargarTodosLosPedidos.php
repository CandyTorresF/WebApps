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
        
        $sql =  "
                    SELECT U.username, orden_ID, tipoHamburguesa, tipoPan, aderezos, cantidad, estado
                    FROM Ordenes O INNER JOIN Usuarios U
                    WHERE O.username = U.username AND estado != 'Terminado';
                ";
        
        $result = $conn -> query($sql);
        
        
        while($row = $result -> fetch_assoc()){
            $response[] = array(
                                "usuario"           => $row["username"],
                                "numero"            => $row["orden_ID"],
                                "tipoHamburguesa"   => $row["tipoHamburguesa"],
                                "tipoPan"           => $row["tipoPan"],
                                "aderezos"          => $row["aderezos"],
                                "cantidad"          => $row["cantidad"],
                                "estado"            => $row["estado"]
                                );
        }
        
        echo json_encode($response);
        
    }
?>
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
        $numeroOrden = $_POST["identificador"];
        
        $sql =  "
                    UPDATE Ordenes
                    SET estado = 'Terminado'
                    WHERE orden_ID = '$numeroOrden'
                ";
        
        if(mysqli_query($conn, $sql)){
               echo json_encode("Pedido actualizado");
        }

        $conn->close();
        
        
        //echo json_encode($sql);
    }
?>
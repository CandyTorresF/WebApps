<?php
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
        $nombre = $_POST["nombre"];
        $tipoHamburguesa = $_POST["tipoHamburguesa"];
        $tipoPan = $_POST["tipoPan"];
        $aderezos = $_POST["aderezos"];
        $cantidad = $_POST["cantidad"];
        
        if (isset($_COOKIE["username"]) && isset($_COOKIE["passwrd"]))
        {
            $usuario = $_COOKIE["username"];
            
            $sql =  "
                        INSERT INTO Ordenes(username, nombre, tipoHamburguesa, tipoPan, aderezos, cantidad, estado)
                        VALUES ('$usuario', '$nombre', '$tipoHamburguesa', '$tipoPan', '$aderezos', '$cantidad', 'En proceso');
                    ";
            if(mysqli_query($conn, $sql)){
                echo json_encode("HOLA");   
            }
        }
        else
        {
            echo "No haz iniciado sesión";
        }
        
        //echo json_encode("HOLA");
    }
?>
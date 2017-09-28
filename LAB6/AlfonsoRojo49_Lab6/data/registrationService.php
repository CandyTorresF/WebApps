<?php
    header('Accept: application/json');
	header('Content-type: application/json');
    
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "AlfonsoRojo49";
    
    //Llave para encriptar la contraseña
    $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
    $key_size =  strlen($key);
    //echo "Key size: " . $key_size . "\n";
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn -> connect_error){
        header("HTTP/1.1 500 Bad Connection to the DataBase");
        die("The servers is down, please try again later.");
    }else{
        $uNombreRegistro = $_POST["uNombreRegistro"];
        $uApellidosRegistro = $_POST["uApellidosRegistro"];
        $uNombreUsuarioRegistro = $_POST["uNombreUsuarioRegistro"];
        $uContrasenaRegistro = $_POST["uContrasenaRegistro"];
        
        $sql = "SELECT firstName, lastName
                FROM Usuarios
                WHERE username = '$uNombreUsuarioRegistro'";
        
        $result = $conn -> query($sql);
        
        if($result -> num_rows == 0){
            
            //Empezando encriptación
            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $uContrasenaRegistro, MCRYPT_MODE_CBC, $iv);
            $ciphertext = $iv . $ciphertext;
            $ciphertext_base64 = base64_encode($ciphertext);
            //echo  $ciphertext_base64 . "\n";
            
            $sqlInsert = "INSERT INTO Usuarios(firstName, lastName, username, accesskey) 
                          VALUES('$uNombreRegistro', '$uApellidosRegistro', '$uNombreUsuarioRegistro', '$ciphertext_base64')";
            
            if(mysqli_query($conn, $sqlInsert)){
                
                //Abrir y guardar datos en la sesion
                session_start();
                $_SESSION["firstName"] = $uNombreRegistro;
				$_SESSION["lastName"] = $uApellidosRegistro;
                
                echo json_encode("Tu usuario se ha registrado existosamente.");
                
            }else{
                die("No se ha podido registrar exitosamente.");
            }
            
        }else{
            header("HTTP/1.1 409 User already exists");
            die("El nombre de usuario ya existe.");
        }
    }
?>

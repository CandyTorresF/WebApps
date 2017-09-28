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
        $uName = $_POST["uUsuarioComentarios"];
        $uPassword = $_POST["uContrasenaComentarios"];
        #echo $uName;
        #echo $uPassword;
        $uCorreo = $_POST["uCorreo"];
        $uComentario = $_POST["uComentario"];
        
        $sqlComentario = "
                            INSERT INTO Comentarios(username, correo, comentario)
                            VALUES ('$uName', '$uCorreo', '$uComentario')
                         ";
        
        $sql = "SELECT firstName, lastName FROM Usuarios WHERE username='$uName'";
        
        $result = $conn->query($sql);
        
        $sqlClave = "SELECT accesskey FROM Usuarios WHERE username='$uName'";
        
        $result2 = $conn->query($sqlClave);
        
        $row = $result2->fetch_assoc();
        
        $prueba = $row["accesskey"];
        
        $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        $key_size =  strlen($key);
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        
        $ciphertext_dec = base64_decode($prueba);
        $iv_dec = substr($ciphertext_dec, 0, $iv_size);
        $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
        
        $contrasenaRecortada = substr($plaintext_dec, 16);
        
        $size1 =  strlen($uPassword);
        $size2 =  strlen($contrasenaRecortada);
        
        $strlen = strlen( $contrasenaRecortada);
        for( $i = 0; $i < $strlen; $i++ ) {
            $char = substr( $contrasenaRecortada, $i, 1 );
        }
        
        $contrasenaLimpia = substr($contrasenaRecortada, 5);
        
        $contrasenaPerfecta = "";
        
        $strlen2 = strlen($contrasenaRecortada);
        for($i = 0; $i < $strlen2; $i++)
        {
            if  (
                    $contrasenaRecortada[$i] == 'a'||
                    $contrasenaRecortada[$i] == 'b'||
                    $contrasenaRecortada[$i] == 'c'||
                    $contrasenaRecortada[$i] == 'd'||
                    $contrasenaRecortada[$i] == 'e'||
                    $contrasenaRecortada[$i] == 'f'||
                    $contrasenaRecortada[$i] == 'g'||
                    $contrasenaRecortada[$i] == 'h'||
                    $contrasenaRecortada[$i] == 'i'||
                    $contrasenaRecortada[$i] == 'j'||
                    $contrasenaRecortada[$i] == 'k'||
                    $contrasenaRecortada[$i] == 'l'||
                    $contrasenaRecortada[$i] == 'm'||
                    $contrasenaRecortada[$i] == 'n'||
                    $contrasenaRecortada[$i] == 'ñ'||
                    $contrasenaRecortada[$i] == 'o'||
                    $contrasenaRecortada[$i] == 'p'||
                    $contrasenaRecortada[$i] == 'q'||
                    $contrasenaRecortada[$i] == 'r'||
                    $contrasenaRecortada[$i] == 's'||
                    $contrasenaRecortada[$i] == 't'||
                    $contrasenaRecortada[$i] == 'u'||
                    $contrasenaRecortada[$i] == 'v'||
                    $contrasenaRecortada[$i] == 'w'||
                    $contrasenaRecortada[$i] == 'x'||
                    $contrasenaRecortada[$i] == 'y'||
                    $contrasenaRecortada[$i] == 'z'||
                    $contrasenaRecortada[$i] == '1'||
                    $contrasenaRecortada[$i] == '2'||
                    $contrasenaRecortada[$i] == '3'||
                    $contrasenaRecortada[$i] == '4'||
                    $contrasenaRecortada[$i] == '5'||
                    $contrasenaRecortada[$i] == '6'||
                    $contrasenaRecortada[$i] == '7'||
                    $contrasenaRecortada[$i] == '8'||
                    $contrasenaRecortada[$i] == '9'||
                    $contrasenaRecortada[$i] == '0'
                )
            {
                $contrasenaPerfecta .= $contrasenaRecortada[$i];
            }
        }
        
        $comparacion = strcmp($uPassword, $contrasenaPerfecta) .  "\n";
        
        if ($comparacion == 0)
		{
            $result2 = $conn -> query($sqlComentario);
            
            // Guardar cookie
			$remember = $_POST["remember"];
			if ($remember == "true")
			{
				setcookie("username", $uName, time() + 3600*24*20);
                setcookie("passwrd", $uPassword, time() + 3600*24*20);
			}
            
			while ($row = $result->fetch_assoc())
			{
				$response = array("firstName"=>$row["firstName"], "lastName"=>$row["lastName"]);
				
				// Abrir y guardar datos en la sesion
				session_start();

				$_SESSION["firstName"] = $row["firstName"];
				$_SESSION["lastName"] = $row["lastName"];
			}

			echo json_encode($response);
		}
		else
		{
			header('HTTP/1.1 406 User not found');
			die("Wrong credentials provided!");
		}
    }
?>

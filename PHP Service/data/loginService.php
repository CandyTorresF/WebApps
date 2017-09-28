<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "LoginSystem";

	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error)
	{
		header('HTTP/1.1 500 Bad connection to Database');
		die("The server is down, we couldn't establish the DB connection");
	}
	else
	{
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];

		//$sql = "SELECT fName, lName FROM Users WHERE username='$uName' AND passwrd='$uPassword'";
        $sql = "SELECT fName, lName FROM Users WHERE username='$uName'";
		
		$result = $conn->query($sql);
        
        //Desde aquí empezamos el desencriptado
        $sqlClave = "SELECT passwrd FROM Users WHERE username='$uName'";
        
        $result2 = $conn->query($sqlClave);
        
        /*
        //Echo para comprobar que si se obtuvo correctamente la contraseña
        while($row = $result2->fetch_assoc())
        {
            echo "Contraseña: " . $row["passwrd"];
            echo "\r\n";
        }
        */
        
        //Echo de una sola iteracion para saber que la contraseña se obtuvo
        /*
        $row = $result2->fetch_assoc();
        echo "Contraseña: " . $row["passwrd"];
        echo "\r\n";
        */
        
        //Pasando la contraseña a una sola variable
        $row = $result2->fetch_assoc();
        $prueba = $row["passwrd"];
        //echo $prueba;
        //echo "\r\n";
        
        $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        $key_size =  strlen($key);
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        
        $ciphertext_dec = base64_decode($prueba);
        $iv_dec = substr($ciphertext_dec, 0, $iv_size);
        $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
        //echo  "Contraseña desencriptada: " . $plaintext_dec . "\n";
        
        $contrasenaRecortada = substr($plaintext_dec, 16);
        //echo "Contraseña lista: " . $contrasenaRecortada . "\n";
        
        //Aquí termina el desencriptado
        
        // ********** // SIGNIFICA QUE SON ECHOS IMPORTANTES
        
        // ********** //
        //echo "Contraseña 1: " . $uPassword . "\n";
        //echo "Contraseña 2: " . $contrasenaRecortada . "\n";
        
        $size1 =  strlen($uPassword);
        $size2 =  strlen($contrasenaRecortada);
        
        // ********** //
        //echo "Tamaño 1: " . $size1 . "\n";
        //echo "Tamaño 2: " . $size2 . "\n";
        
        //echo strcmp($uPassword, $contrasenaRecortada) . "\n";
        
        //$str = "String to loop through"
        //$contrasenaRecortada
        $strlen = strlen( $contrasenaRecortada);
        for( $i = 0; $i < $strlen; $i++ ) {
            $char = substr( $contrasenaRecortada, $i, 1 );
            // ********** // SOLO EL PRIMERO DE ABAJO
            //echo $i . ": " . ">" . $char . "<" . "\n";
            // $char contains the current character, so do your processing here
        }
        
        $contrasenaLimpia = substr($contrasenaRecortada, 5);
        // ********** //
        //echo "Contraseña limpia: " . $contrasenaLimpia .  "\n";
        //echo "Tamaño: " . strlen($contrasenaLimpia) .  "\n";
        
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
        
        // ********** //
        //echo "Contraseña original: " . $uPassword .  "\n";
        //echo "Tamaño: " . strlen($uPassword) .  "\n";
        
        // ********** //
        //echo "Contraseña perfecta: " . $contrasenaPerfecta .  "\n";
        //echo "Tamaño: " . strlen($contrasenaPerfecta) .  "\n";
        
        $comparacion = strcmp($uPassword, $contrasenaPerfecta) .  "\n";
        //echo "Comparación: " . $comparacion  .  "\n";
        
        //$result->num_rows > 0
        
		if ($comparacion == 0)
		{
            // Guardar cookie
			$remember = $_POST["remember"];
			if ($remember == "true")
			{
				setcookie("username", $uName, time() + 3600*24);
                
			}
            
			while ($row = $result->fetch_assoc())
			{
				$response = array("firstName"=>$row["fName"], "lastName"=>$row["lName"]);
				
				// Abrir y guardar datos en la sesion
				session_start();

				$_SESSION["firstName"] = $row["fName"];
				$_SESSION["lastName"] = $row["lName"];
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

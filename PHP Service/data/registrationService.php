<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "LoginSystem";

    //Llave para encriptar la contraseña
    $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
    $key_size =  strlen($key);
    //echo "Key size: " . $key_size . "\n";
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) 
	{
	    header('HTTP/1.1 500 Bad connection to Database');
	    die("The server is down, we couldn't establish the DB connection");
	}
	else
	{
		$userName = $_POST['username'];
		
		$sql = "SELECT username FROM Users WHERE username = '$userName'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			header('HTTP/1.1 409 Conflict, Username already in use please select another one');
		    die("Username already in use.");
		}
		else
		{
			$userPassword = $_POST['userPassword'];
			$userFirstName = $_POST['userFirstName'];
			$userLastName = $_POST['userLastName'];
            
            //Empezando encriptación
            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $userPassword, MCRYPT_MODE_CBC, $iv);
            $ciphertext = $iv . $ciphertext;
            $ciphertext_base64 = base64_encode($ciphertext);
            //echo  $ciphertext_base64 . "\n";

			
			$sql = "INSERT INTO Users (fName, lName, username, passwrd) VALUES ('$userFirstName', '$userLastName', '$userName', '$ciphertext_base64')";
	    	
	    	if (mysqli_query($conn, $sql)) 
	    	{
	    		// Abrir y guardar datos en la sesion
				session_start();

				$_SESSION["firstName"] = $userFirstName;
				$_SESSION["lastName"] = $userLastName;
			    echo json_encode("New record created successfully");
			} 
			else 
			{
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
			    die("Error: " . $sql . "\n" . mysqli_error($conn));
			}
		}
	} 

?>

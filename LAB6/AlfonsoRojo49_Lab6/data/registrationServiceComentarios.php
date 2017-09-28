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
        
        #echo "Si hay conexión";
        
        $uNombreRegistro = $_POST["uNombreRegistroComentarios"];
        $uApellidosRegistro = $_POST["uApellidosRegistroComentarios"];
        $uNombreUsuarioRegistro = $_POST["uNombreUsuarioRegistroComentarios"];
        $uContrasenaRegistro = $_POST["uContrasenaRegistroComentarios"];
        $uCorreo = $_POST["uCorreo"];
        $uComentario = $_POST["uComentario"];
        
        #echo $uNombreRegistro;
        #echo $uApellidosRegistro;
        #echo $uNombreUsuarioRegistro;
        #echo $uContrasenaRegistro;
        #echo $uCorreo;
        #echo $uComentario;;
        
        #Query para comprobar que no haya un usuario con el mismo nombre que con el que se quiere registrar
        $sqlUsuario =   "
                            SELECT username
                            FROM Usuarios
                            WHERE username = '$uNombreUsuarioRegistro'
                        ";
        
        $resultadoComprobacion = $conn -> query($sqlUsuario);
        
        if($resultadoComprobacion -> num_rows == 0)
        {
            //Empezando encriptación
            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $uContrasenaRegistro, MCRYPT_MODE_CBC, $iv);
            $ciphertext = $iv . $ciphertext;
            $ciphertext_base64 = base64_encode($ciphertext);
            //echo  $ciphertext_base64 . "\n";
            
            #echo "No hay usuario registrado con ese nombre aún";
            
            #Query para el registro del usuario en la base de datos
            $sqlRegistro =  "
                                INSERT INTO Usuarios(firstName, lastName, username, accesskey)
                                VALUES('$uNombreRegistro', '$uApellidosRegistro', '$uNombreUsuarioRegistro', '$ciphertext_base64')
                            ";
            
            #echo $sqlRegistro;
            
            if(mysqli_query($conn, $sqlRegistro))
            {
                #echo "Se ha podido registrar el usuario";
                
                #Creción de la sesión de usuario
                session_start();
                $_SESSION["firstName"] = $uNombreRegistro;
                $_SESSION["lastName"] = $uApellidosRegistro;
                
                #Query para el registro del comentario en la base de datos
                $sqlComentario =    "
                                        INSERT INTO Comentarios(username, correo, comentario)
                                        VALUES('$uNombreUsuarioRegistro', '$uCorreo', '$uComentario')
                                    ";
                
                #echo $sqlComentario;
                
                if(mysqli_query($conn, $sqlComentario))
                {
                    echo json_encode("Se pudo insertar el comentario en la base de datos");
                }
                else
                {
                    echo "No se pudo insertar el comentario en la base de datos";
                }
            }
            else
            {
                echo "No se ha podido registrar el usuario";
            }
        }
        else
        {
            echo "Ya hay un usuario con ese nombre";
        }
    }
?>
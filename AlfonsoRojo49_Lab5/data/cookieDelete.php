<?php

	header('Content-type: application/json');

	if (isset($_COOKIE["username"]) && isset($_COOKIE["passwrd"]))
	{
		setcookie ("username", "", time() - 3600);
        setcookie ("passwrd", "", time() - 3600);
        
        echo json_encode("La credenciales se han eliminado.");
	}
	else
	{
		header('HTTP/1.1 406 Cookie has not been set');
		die("There are not saved cookies yet.");
	}
?>
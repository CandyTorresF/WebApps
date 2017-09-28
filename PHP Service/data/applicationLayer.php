<?php
	header('Accept: application/json');
	header('Content-type: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["accion"];

	switch($action)
	{
		case "LOGIN" : loginFunction();
						break;
	}


	function loginFunction()
	{
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];

		$response = attemptLogin($uName, $uPassword);

		if ($response["status"] == "EXITO")
		{
			startSession($response["firstName"], $response["lastName"]);
			
			startCookie($uName);

			echo json_encode($response);
		}
		else
		{
			errorHandling($response["status"]);
		}
	}

	function startSession($fName, $lName)
	{
		// Abrir y guardar datos en la sesion
		session_start();

		$_SESSION["firstName"] = $fName;
		$_SESSION["lastName"] = $lName;
	}

	function startCookie($uName)
	{
		$remember = $_POST["remember"];
		if ($remember == "true")
		{
			setcookie("username", $uName, time() + 3600*24);
		}	
	}

	function errorHandling($errorStatus)
	{
		switch ($errorStatus)
		{
			case "406" : header('HTTP/1.1 406 User not found');
						die("Wrong credentials provided!");
						break;
			case "500" : header('HTTP/1.1 500 Bad connection to Database');
						die("The server is down, we couldn't establish the DB connection");
						break;
		}
	}
?>

<?php

	header('Content-type: application/json');

	if (isset($_COOKIE["username"]) && isset($_COOKIE["passwrd"]))
	{
		echo json_encode(array("username" => $_COOKIE["username"], "passwrd" => $_COOKIE["passwrd"]));
	}
	else
	{
		header('HTTP/1.1 406 Cookie has not been set');
		die("There are not saved cookies yet.");
	}
?>
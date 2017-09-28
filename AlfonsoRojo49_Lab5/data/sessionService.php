<?php
	header('Content-type: application/json');

	session_start();
	if (isset($_SESSION["firstName"]) && isset($_SESSION["lastName"]))
	{
		echo json_encode(array("fName" => $_SESSION["firstName"], "lName" => $_SESSION["lastName"]));
	}
	else
	{
		header('HTTP/1.1 406 Session has expired.');
		die("Your session has expired you will be redirected to the index.");
	}

?>
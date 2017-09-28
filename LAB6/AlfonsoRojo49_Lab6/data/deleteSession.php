<?php
	header('Content-type: application/json');

	session_start();
	if (isset($_SESSION["firstName"]) && isset($_SESSION["lastName"]))
	{
		unset($_SESSION["firstName"]);
		unset($_SESSION["lastName"]);
		session_destroy();
		echo json_encode(array("successMessage" => "Session deleted successfully"));
	}
	else
	{
		header('HTTP/1.1 406 Session has expired.');
		die("Your session has expired you will be redirected to the index.");
	}

?>
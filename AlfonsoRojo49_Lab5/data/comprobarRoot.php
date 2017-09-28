<?php
    //echo json_encode("SI");

    if (isset($_COOKIE["username"]) == "admin")
	{
		echo json_encode(array("username" => $_COOKIE["username"], "passwrd" => $_COOKIE["passwrd"]));
	}
	else
	{
		header('HTTP/1.1 406 Admin is not the user logged in');
		die("The user logged in is not the admin");
	}
?>
<?php
	
	function connectionToDataBase()
	{
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "LoginSystem";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		// Check connection
		if ($conn->connect_error) 
		{
			return null;
		}
		else
		{
			return $conn;
		}
	}

	function attemptLogin($userName, $userPassword)
	{
		
		$connection = connectionToDataBase();

		if ($connection != null)
		{
			$sql = "SELECT fName, lName FROM Users WHERE username='$userName' AND passwrd='$userPassword'";
		
			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					$response = array("status" => "EXITO","firstName"=>$row["fName"], "lastName"=>$row["lName"]);
				}

				$connection -> close();
				return $response;
			}
			else
			{
				$connection -> close();
				return array("status" => "406");
			}
		}
		else
		{
			return array("status" => "500");
		}
		
		return array("status" => "500");
	}


?>
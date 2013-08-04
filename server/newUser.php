<?php
	$email 		= $_REQUEST["email"];
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');

	function checkUnique( $email ) {
		$query 	= "SELECT * FROM user WHERE email = '" . $email . "'";
		$stmt = $mysqli->query($query);

		if($stmt->num_rows > 0) {
				return False;
		}
		else {
			return True;
		}
	}

	function addUser() {
		$email 		= $_REQUEST["email"];
		$firstName 	= $_REQUEST["firstName"];
		$lastName	= $_REQUEST["lastName"];
		$password 	= $_REQUEST["password"];

		$query = "INSERT INTO user ( id, firstName, lastName, email, password, token_created, accessToken, account_created ) VALUES ( NULL, '" . $firstName . "', '" . $lastName . "', '" . $email . "', '" . $password . "', '0000-00-00 00:00:00', -1, CURRENT_TIMESTAMP)";
		if( !$mysqli->query($query) ) {
			$result = array("result" => "failure", "msg" => "query 2 error");
		}
		else {
			$result = array("result" => "success");
		}

		return $result;
	}

	if( checkUnique() ) {
		echo json_encode(addUser());
	}
	else {
		$result = array("result" => "failure", "msg" => "Username exists");
		echo json_encode($result);
	}

?>
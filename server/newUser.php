<?php
	function checkUnique( $email ) {
		$isUnique 	= true;
		$mysqli 	= new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
		$queryResult= $mysqli->query( "SELECT * FROM user WHERE email = '" . $email . "'" );
		if( $queryResult->num_rows > 0 ) {
			$isUnique = false;
		}
		$mysqli->close();
		return $isUnique;
	}

	function addUser( $email, $firstName, $lastName, $password ) {
		$mysqli 	= new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
		$queryResult= $mysqli->query( "INSERT INTO user ( id, firstName, lastName, email, password, token_created, accessToken, account_created ) VALUES ( NULL, '" . $firstName . "', '" . $lastName . "', '" . $email . "', '" . $password . "', '0000-00-00 00:00:00', -1, CURRENT_TIMESTAMP)" );
		if( $queryResult ) {
			$result = array( "result" => "success" );
		}
		else {
			$result = array( "result" => "failure" );
		}
		$mysqli->close();
		return $result;
	}

	$email 		= $_REQUEST["email"];
	$firstName 	= $_REQUEST["firstName"];
	$lastName 	= $_REQUEST["lastName"];
	$password 	= $_REQUEST["password"];

	$isUnique 	= checkUnique($email);

	if( $isUnique ) {
		$result = addUser($email, $firstName, $lastName, $password);
		echo json_encode( $result );
	}
	else {
		$result = array( "result" => "failure", "error" => "Not unique" );
		echo json_encode( $result );
	}
?>
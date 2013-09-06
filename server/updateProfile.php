<?php
	$email 		= $_REQUEST["email"];
	$firstName 	= $_REQUEST["firstName"];
	$lastName 	= $_REQUEST["lastName"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "UPDATE user SET firstName='" . $firstName . "', lastName='" . $lastName . "' WHERE email='" . $email . "'" );

	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "err" => $mysqli->error() );
	}

	$mysqli->close();
	echo json_encode( $result );
?>
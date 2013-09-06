<?php
	function verifyPassword( $currPwd, $email ) {
		$isVerified = true;
		$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
		$queryResult = $mysqli->query( "SELECT * FROM user WHERE email = '" . $email . "' AND password = '" . $currPwd . "'" );
		if( $queryResult->num_rows == 0 ) {
			$isVerified = false;
		}
		$mysqli->close();
		return $isVerified;
	}

	function changePassword( $currPwd, $newPwd, $email ) {
		$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
		$queryResult = $mysqli->query( "UPDATE user SET password='" . $newPwd . "' WHERE email='" . $email . "'" );
	
		if( $queryResult ) {
			$result = array( "result" => "success" );
		}
		else {
			$result = array( "result" => "failure", "error" => $mysqli->error() );
		}

		$mysqli->close();
		return $result;
	}

	$email 		= $_REQUEST["email"];
	$newPwd 	= $_REQUEST["newPwd"];
	$currPwd 	= $_REQUEST["currPwd"];

	if( verifyPassword( $currPwd, $email ) ) {
		$result = changePassword( $currPwd, $newPwd, $email );
	}
	else {
		$result = array( "result" => "failure", "error" => "Password invalid" );
	}

	echo json_encode( $result );
?>
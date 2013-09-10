<?php
	$ansId 	= $_REQUEST["ansId"];
	$rating = $_REQUEST["rating"];

	if( $rating == "approve" ) {
		$queryString = "UPDATE answer SET approval=approval+1 WHERE id='" . $ansId . "'";
	}
	else {
		$queryString = "UPDATE answer SET disapproval=disapproval+1 WHERE id='" . $ansId . "'";
	}

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( $queryString );
	
	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "error" => $mysqli->error() );
	}

	$mysqli->close();
	echo json_encode( $result );
?>
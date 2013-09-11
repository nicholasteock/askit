<?php
	$ansId 	= $_REQUEST["ansId"];
	$userId = $_REQUEST["userId"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT * FROM answer WHERE id=" . $ansId . " AND author=" . $userId );

	$data = array();

	if( $queryResult ) {
		while( $row = $queryResult->fetch_assoc() ) {
			$data[] = $row;
		}
		$result = array( "result" => "success", "data" => $data );
	}
	else {
		$result = array( "result" => "failure", "error" => $mysqli->error() );
	}

	$mysqli->close();
	echo json_encode( $result );
?>
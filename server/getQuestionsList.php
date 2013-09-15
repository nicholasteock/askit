<?php
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT * FROM question WHERE 1" );

	$questions = array();

	if( $queryResult ) {
		while( $row = $queryResult->fetch_assoc() ) {
			$questions[] = $row;
		}

		$data = array( "count" => $queryResult->num_rows, "questions" => $questions );
		$result = array( "result" => "success", "data" => $data );
	}
	else {
		$result = array( "result" => "failure", error => $mysqli_error() );
	}
	
	$mysqli->close();
	echo json_encode( $result );
?>
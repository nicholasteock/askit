<?php
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT * FROM topics WHERE 1" );

	$data 			= array();
	$levelArray 	= array();
	$subjectArray 	= array();
	$topicArray 	= array();

	if( $queryResult ) {
		for( $rowIndex = $queryResult->num_rows - 1; $rowIndex>=0; $rowIndex-- ) {
			$queryResult->data_seek($rowIndex);
			$row 		= $queryResult->fetch_assoc();
			array_push( $levelArray, $row["level"] );
			array_push( $subjectArray, $row["subject"] );
			array_push( $topicArray, $row["topic"] );
		}

		$data 	= array( 
							"level" 	=> array_keys(array_count_values($levelArray)),
							"subject" 	=> array_keys(array_count_values($subjectArray)),
							"topic" 	=> array_keys(array_count_values($topicArray))
						);

		$result = array( "result" => "success", "data" => $data );
	}
	else {
		$result = array( "result" => "failure", "error" => $mysqli->error() );
	}

	$mysqli->close();
	echo json_encode( $result );
?>
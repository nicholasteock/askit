<?php
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT * FROM question WHERE 1" );

	$count = 0;
	$questions = array();
	if( $queryResult ) {
		$count = $queryResult->num_rows;
		for ($rowIndex = $count - 1; $rowIndex >=0; $rowIndex--) {
			$queryResult->data_seek($rowIndex);
			$row = $queryResult->fetch_assoc();
			$tmp = array(	
							"id" 		=> $row["id"],
							"level" 	=> $row["level"],
							"subject" 	=> $row["subject"],
							"topic" 	=> $row["topic"],
							"content"	=> $row["content"],
							"author" 	=> $row["author"],
							"timestamp" => $row["timestamp"]
						);
			array_push( $questions, $tmp );
		}
	}
	
	$data = array( "count" => $count, "questions" => $questions );

	$result = array( "result" => "success", "data" => $data );
	echo json_encode( $result );
?>
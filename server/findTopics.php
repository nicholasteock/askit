<?php
	$level 		= $_REQUEST["level"];
	$subject 	= $_REQUEST["subject"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT topic FROM topics WHERE level='" . $level . "' AND subject='" . $subject . "'" );

	$data = array();
	if( $queryResult ) {
		for ($rowIndex = $queryResult->num_rows - 1; $rowIndex >=0; $rowIndex--) {
			$queryResult->data_seek($rowIndex);
			$row = $queryResult->fetch_assoc();
			$tmp = $row["topic"];
			array_push( $data, $tmp );
		}
	}
	
	$result = array( "result" => "success", "data" => $data );
	echo json_encode( $result );
?>
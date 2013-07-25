<?php
	$level 	= $_REQUEST["level"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT DISTINCT subject FROM topics WHERE level='" . $level . "'" );

	$data = array();
	if( $queryResult ) {
		for ($rowIndex = $queryResult->num_rows - 1; $rowIndex >=0; $rowIndex--) {
			$queryResult->data_seek($rowIndex);
			$row = $queryResult->fetch_assoc();
			$tmp = $row["subject"];
			array_push( $data, $tmp );
		}
	}
	
	$result = array( "result" => "success", "data" => $data );
	echo json_encode( $result );
?>
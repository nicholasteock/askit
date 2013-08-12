<?php
	$qnId = $_REQUEST["qnId"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query("SELECT * FROM question WHERE id='" . $qnId . "'");

	$data = array();

	if( $queryResult ) {
		while( $row = $queryResult->fetch_assoc() ) {
			$data[] = $row;
		}
	}

	$result = array( "result" => "success", "data" => $data );
	$mysqli->close();
	echo json_encode( $result );
?>
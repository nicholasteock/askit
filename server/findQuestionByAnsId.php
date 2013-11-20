<?php

	$ansId 	= $_REQUEST["ansId"];
	$userId = $_REQUEST["userId"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT q.level AS level, q.subject AS subject, q.topic AS topic, q.content AS content, q.type as type, q.image AS image FROM `question` AS q, `answer` AS a WHERE q.id=a.qnId AND a.id=" . $ansId . " AND a.author=" . $userId );

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
<?php
	$userId = $_REQUEST["userId"];

	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT q.id AS qnId, q.level AS qnLevel, q.subject AS qnSubject, q.topic AS qnTopic, q.content AS qnContent, q.timestamp AS qnTimestamp, a.id AS ansId, a.content AS ansContent, a.timestamp AS ansTimestamp, a.author AS ansAuthor FROM `question` AS q, `answer` AS a WHERE q.id = a.qnId AND q.author=" . $userId );

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
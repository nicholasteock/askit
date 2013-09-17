<?php
	$level 			= $_REQUEST["level"];
	$subject 		= $_REQUEST["subject"];
	$topic 			= $_REQUEST["topic"];
	$levelQuery 	= "";
	$subjectQuery	= "";
	$topicQuery 	= "";
	$tmp 			= array();

	if( $level != "All" ) {
		$levelQuery = "level='" . $level . "'";
		array_push($tmp, $levelQuery);
	}
	if( $subject != "All" ) {
		$subjectQuery = "subject = '" . $subject . "'";
		array_push($tmp, $subjectQuery);
	}
	if( $topic != "All" ) {
		$topicQuery = "topic = '" . $topic . "'";
		array_push($tmp, $topicQuery);
	}

	if( count($tmp) == 0 ) {
		$queryFilters = " 1";
	}
	else {
		$queryFilters = implode( " AND ", $tmp );
	}
echo $queryFilters;
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT * FROM question WHERE " . $queryFilters );

	$questions = array();

	if( $queryResult ) {
		while( $row = $queryResult->fetch_assoc() ) {
			$questions[] = $row;
		}
		$data 	= array( "count" => $queryResult->num_rows, "questions" => $questions );
		$result = array( "result" => "success", "data" => $data );
	}
	else {
		$result = array( "result" => "failure", "error" => $mysqli->error() );	
	}

	$mysqli->close();
	echo json_encode( $result );
?>
<?php
	$id 		= $_REQUEST["id"];
	$content 	= $_REQUEST["content"];
	$author 	= $_REQUEST["author"];
	
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "INSERT INTO answer (`id`, `qnId`, `content`, `author`, `timestamp`) VALUES ( NULL, '" . $id . "', '" . $content . "', '" . $author . "', CURRENT_TIMESTAMP);" );
	
	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "err" => $mysqli->error() );
	}

	$mysqli->close();
	echo json_encode( $result );
?>
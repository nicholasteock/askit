<?php
	$level 		= $_REQUEST["level"];
	$subject 	= $_REQUEST["subject"];
	$topic		= $_REQUEST["topic"];
	$content	= $_REQUEST["content"];
	$author		= $_REQUEST["author"];
	$type 		= $_REQUEST["method"];

	if( $type == "image" ) {
		$image = $_REQUEST["imageSrc"];
	}
	else {
		$image = "";
	}
	
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$image 	= $mysqli->real_escape_string($image);
	$queryResult = $mysqli->query( "INSERT INTO question (`id`, `level`, `subject`, `topic`, `type`, `image`, `content`, `author`, `timestamp`) VALUES ( NULL, '" . $level . "', '" . $subject . "', '" . $topic . "', '" . $type . "', '" . $image . "', '" . $content . "', '" . $author . "', CURRENT_TIMESTAMP);" );
	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "error" => $queryResult );
	}
	$mysqli->close();
	echo json_encode( $result );
?>
<?php
	$id 			= $_REQUEST["id"];
	$content 	= $_REQUEST["content"];
	$author 	= $_REQUEST["author"];
	$image 		=	isset($_REQUEST['imageSrc']) ? $_REQUEST["imageSrc"] : "";
	
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "INSERT INTO answer (`id`, `qnId`, `content`, `image`, `author`, `timestamp`) VALUES ( NULL, '" . $id . "', '" . $content . "', '" . $image . "', '" . $author . "', CURRENT_TIMESTAMP);" );
	
	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "error" => $mysqli->error() );
	}

	$mysqli->close();
	echo json_encode( $result );
?>
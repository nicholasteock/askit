<?php
	$id 		= $_REQUEST["id"];
	$content 	= $_REQUEST["content"];
	$author 	= $_REQUEST["author"];
	$con		= mysql_connect( "127.0.0.1", "root", "");
	mysql_select_db( "askitdb" );
	
	$queryResult = mysql_query( "INSERT INTO answer (`id`, `qnId`, `content`, `author`, `timestamp`) VALUES ( NULL, '" . $id . "', '" . $content . "', '" . $author . "', CURRENT_TIMESTAMP);" );
	
	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "err" => $queryResult );
	}
	echo json_encode( $result );
?>

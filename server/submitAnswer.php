<?php
	$id 		= $_REQUEST["id"];
	$content 	= $_REQUEST["content"];
	$author 	= $_REQUEST["author"];
	$con = mysql_connect('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb', '3306');
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

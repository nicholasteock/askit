<?php
	$level 		= $_REQUEST["level"];
	$subject 	= $_REQUEST["subject"];
	$topic		= $_REQUEST["topic"];
	$content	= $_REQUEST["content"];
	$author		= "Nicholas Teo";
	$con = mysql_connect('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb', '3306');
	mysql_select_db( "askitdb" );
	
	$queryResult = mysql_query( "INSERT INTO question (`id`, `level`, `subject`, `topic`, `content`, `author`, `timestamp`) VALUES ( NULL, '" . $level . "', '" . $subject . "', '" . $topic . "', '" . $content . "', '" . $author . "', CURRENT_TIMESTAMP);" );
	
	if( $queryResult ) {
		$result = array( "result" => "success" );
	}
	else {
		$result = array( "result" => "failure", "err" => $queryResult );
	}
	echo json_encode( $result );
?>

<?php
	$level 		= $_REQUEST["level"];
	$subject 	= $_REQUEST["subject"];
	$con		= mysql_connect( "127.0.0.1", "root", "");
	mysql_select_db( "askitdb" );
	
	$queryResult = mysql_query( "SELECT topic FROM topics WHERE level='" . $level . "' AND subject='" . $subject . "'" );

	$data = array();
	while($row = mysql_fetch_array($queryResult)) {
		$tmp = $row["topic"];
		array_push( $data, $tmp );
	}
	
	$result = array( "result" => "success", "data" => $data );
	echo json_encode( $result );
?>

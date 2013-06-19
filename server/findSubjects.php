<?php
	$level 	= $_REQUEST["level"];
	$con	= mysql_connect( '127.0.0.1', 'root', '');
	mysql_select_db( "askitdb" );
	
	$queryResult = mysql_query( "SELECT DISTINCT subject FROM topics WHERE level='" . $level . "'" );

	$data = array();
	while($row = mysql_fetch_array($queryResult)) {
		$tmp = $row["subject"];
		array_push( $data, $tmp );
	}
	
	$result = array( "result" => "success", "data" => $data );
	echo json_encode( $result );
?>

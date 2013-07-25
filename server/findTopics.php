<?php
	$level 		= $_REQUEST["level"];
	$subject 	= $_REQUEST["subject"];
	$con = mysql_connect('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb', '3306');
	// $con		= mysql_connect( "ec2-54-213-3-190.us-west-2.compute.amazonaws.com", "root", "1234");
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

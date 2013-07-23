<?php
	// $con	= mysql_connect( '127.0.0.1', 'root', '');
	$con = mysql_connect('askitdbinstance.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'liverpool', 'askitdb', '3306');
	mysql_select_db( "askitdb" );
	
	$queryResult = mysql_query( "SELECT * FROM question WHERE 1" );

	$count = 0;
	$questions = array();
	while( $row = mysql_fetch_array($queryResult) ) {
		$tmp = array(	
						"id" 		=> $row["id"],
						"level" 	=> $row["level"],
						"subject" 	=> $row["subject"],
						"topic" 	=> $row["topic"],
						"content"	=> $row["content"],
						"author" 	=> $row["author"],
						"timestamp" => $row["timestamp"]
					);
		array_push( $questions, $tmp );
		$count += 1;
	}
	
	$data = array( "count" => $count, "questions" => $questions );
	
	$result = array( "result" => "success", "data" => $data );
	echo json_encode( $result );
?>

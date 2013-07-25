<?php

// require_once( "Globals.php" );
// require_once( "ASKITAPI.php" );



$loginFile 			= "index_login_screen.php";
$postloginFile 		= "index_askit_screen.php";
$is_httppost 		= $_SERVER["REQUEST_METHOD"] == 'POST';
$hasAccessToken		= isset( $_COOKIE['accessToken']);
$accessToken 		= $hasAccessToken ? $_COOKIE['accessToken'] : "";
$hasLoginFormValue 	= isset( $_POST["email"] ) && isset( $_POST["password"] );

// Iknow putting all these connections stuff out here is bad practice and stuff
// Will be removed and moved to a backend api after first pass

$con = mysql_connect('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo');
mysql_select_db( "askitdb" );

//Checks login credentials with DB.
//Success: accessToken
//Failure: "failure"
function doLogin( $email, $password ) {
	$queryResult = mysql_query( "SELECT accessToken, token_created FROM user WHERE email = '" . $email . "' AND password = '" . $password . "'" );
	// If user/pass match found, check accessToken if empty string.
	// If so, generate some string for now and call an insert.
	// TODO: If accessToken not empty, compared with timestamp for expiry.

	if( $queryResult ) {
		while( $row = mysql_fetch_array($queryResult)) {
			$resultAccessToken = $row["accessToken"];

			if( $resultAccessToken == "-1" ) {
				return createToken($email);
			}
			return $resultAccessToken;
		}
	}
	else {
		return "";
	}
}

function createToken( $email ) {
	$newToken = "3214234jddjsdfl";
	$insertToken = mysql_query( "UPDATE user SET accessToken='" . $newToken . "', token_created=CURRENT_TIMESTAMP WHERE email='" . $email . "'" );
	if( $insertToken ) {
		return $newToken;
	}
	else {
		return "";
	}
}

//Gets user details based on accessToken
//Success: Object with user details
//Failure: Empty string
function whoAmI( $accessToken ) {
	$queryUser = mysql_query( "SELECT id, name, email FROM user WHERE accessToken='" . $accessToken . "'");
	
	if( $queryUser ) {
		while( $row = mysql_fetch_object($queryUser) ) {
			return json_encode($row);
		}
	}
	else {
		return "";
	}
}


if( $is_httppost && $hasLoginFormValue ) {
	$accessToken = doLogin( $_POST["email"], $_POST["password"] );
}

if( gettype($accessToken) == 'string' && strlen($accessToken)>0 ) {
	$userInfo = whoAmI($accessToken);
	if($hasLoginFormValue) {
		header("Location: /#");
		setcookie("accessToken", $accessToken);
		setcookie("justloggedin", "true");
		exit();
		return;
	}
	include $postloginFile;
	exit();
	return;
}

if( $hasLoginFormValue ) {
	//can do some login failed stuff here
}

include $loginFile;
exit();
return;









// $askitapi = new ASKITAPI();

// IMPLEMENTATION USING ASKITAPI
// if( $is_httppost && $hasLoginFormValue ) {
// 	$accessToken = $askitapi->doLogin( $_POST["login"], $_POST["password"] );
// 	$askitapi->accessToken = $accessToken;
// 	if( strlen($accessToken) == 0 ) {
// 		//Login failed.
// 	}
// }

// if( gettype($accessToken) == 'string' && strlen($accessToken)>0 ) {
// 	$userInfo = $askitapi->whoAmI($accessToken);
// 	if($hasLoginFormValue) {
// 		header("Location: /#");
// 		setcookie("accessToken", $accessToken);
// 		setcookie("justLoggedIn", "true");
// 		exit();
// 		return;
// 	}
// 	include $postloginFile;
// 	exit();
// 	return;
// }

// if( $hasLoginFormValue ) {
// 	$stdMsg = "Login Failed. The username or password entered is incorrect.";
// 	setcookie("notificationOnLoginScreen", $stdMsg);
// }

// include $loginFile;
// exit();
// return;
?>
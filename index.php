<?php
// Iknow putting all these connections stuff out here is bad practice and stuff
// Will be removed and moved to a backend api after first pass

// require_once( "Globals.php" );
// require_once( "ASKITAPI.php" );


$tokenExpiryTime 	= 24;
$loginFile 			= "index_login_screen_v2.php";
$postloginFile 		= "index_askit_screen.php";
$is_httppost 		= $_SERVER["REQUEST_METHOD"] == 'POST';
$hasAccessToken		= isset( $_COOKIE['accessToken']);
$accessToken 		= $hasAccessToken ? $_COOKIE['accessToken'] : "";
$hasLoginFormValue 	= isset( $_POST["email"] ) && isset( $_POST["password"] );
$newUserLogin 		= isset( $_POST["newUserEmail"] ) && isset( $_POST["newUserPassword"]);



//Checks login credentials with DB.
//Success: accessToken
//Failure: "failure"
function doLogin( $email, $password ) {
	$result = "";
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT accessToken, token_created FROM user WHERE email = '" . $email . "' AND password = '" . $password . "'" );
	
	// If user/pass match found, check accessToken if empty string.
	// If so, generate some string for now and call an insert.
	// TODO: If accessToken not empty, compared with timestamp for expiry.
	if( $queryResult ) {
		for ($rowIndex = $queryResult->num_rows - 1; $rowIndex >=0; $rowIndex--) {
			$queryResult->data_seek($rowIndex);
			$row = $queryResult->fetch_assoc();
			if( $row["accessToken"] == "-1" ) {
				$result = createToken( $email );
			}
			else {
				$result = $row["accessToken"];
			}
		}
	}
	$mysqli->close();
	return $result;
}

function createToken( $email ) {
	$newToken = strval(rand(123456, 999999999999999999999));
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = 	$mysqli->query( "UPDATE user SET accessToken='" . $newToken . "', token_created=CURRENT_TIMESTAMP WHERE email='" . $email . "'");

	if( $queryResult ) {
		$mysqli->close();
		return $newToken;
	}
	else {
		$mysqli->close();
		return "";
	}
}

//Gets user details based on accessToken
//Success: Object with user details
//Failure: Empty string
function whoAmI( $accessToken ) {
	$mysqli = new mysqli('askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com', 'nicholasteo', 'nicholasteo', 'askitdb');
	$queryResult = $mysqli->query( "SELECT id, firstName, lastName, email FROM user WHERE accessToken=" . $accessToken);
	if( $queryResult ) {
		for ($rowIndex = $queryResult->num_rows - 1; $rowIndex >=0; $rowIndex--) {
			$queryResult->data_seek($rowIndex);
			$row = $queryResult->fetch_assoc();
			$mysqli->close();
			return json_encode($row);
		}
	}
	else {
		$mysqli->close();
		return "";
	}
}

if( $is_httppost && $hasLoginFormValue ) {
	$accessToken = doLogin( $_POST["email"], $_POST["password"] );
}
else if( $is_httppost && $newUserLogin ) {
	$accessToken = doLogin( $_POST["newUserEmail"], $_POST["newUserPassword"] );
	//echo '<script type="text/javascript">alert("Access token is :' . $accessToken . '");</script>';
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
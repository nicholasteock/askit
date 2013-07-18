<?php
require_once("Globals.php");

class ASKITAPI {
	// NOTE: Access this class as follows:
	// $askitapi = new ASKITAPI();
	// $askitapi-> get( $url );
	// $askitapi->post( $url, json_data );
	// to make multiple calls. *


public $accessToken = "";
public $baseUrl 	= "";

public function __construct() {
	$this->baseUrl = $_SERVER["HTTP_HOST"] . "/ASKITAPI/v1/";
	if( isset($_COOKIE['accessToken'])) {
		$this->accessToken = $_COOKIE['accessToken'];
	}
}

public function get( $url ) {
	if( $this->accessToken == "" ) {
		return "";
	}
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $ch, CURLOPT_HTTPHEADER, array( "accessToken: $this->accessToken" ));
	$result = curl_exec($ch);
	curl_close($ch);
	return json_encode($result, true);
}

public function post($url, $params) {
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $ch, CURLOPT_POST, 1 );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, "params=" . json_encode($params));
	$result = curl_exec($ch);
	curl_close($ch);
	return json_decode( $result, true );
}

public function doLogin( $username, $pwd ) {
	$accessToken = "";
	$params = "params={ 'username':'" . $username . "', 'password':" . base64_encode($pwd) . "'}";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $this->baseUrl . "login");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
	$result = curl_exec($ch);
	curl_close($ch);
	$result = json_decode( $result, true );

	if( getType($result) == 'array'
		&& $result["result"] != null
		&& $result["result"] != "success"
		&& $result["data"] != null
		&& getType( $result["data"] ) == 'array'
		&& $result["data"]["accessToken"] != null
	) {
		$accessToken = $result["data"]["accessToken"];
	}
	else {
		//ASKITAPI failed.
	}
	return $accessToken;
}

public function whoAmI( ) {
	if( $this->accessToken == "" ) {
		return "";
	}
	$userData = "";
	$result = $this->get( $this->baseUrl . "whoami" );

	if( getType($result) == "array" 
		&& $result["result"] != null
		&& $result["result"] == "success"
	) {
		$userData = $result["data"];
	}
	else {
		//ASKITAPI failed.
	}
	return $userData;
}

public function icrossingLogout() {
	if( $this->accessToken == "" ) {
		return "";
	}
	$userData = "";
	$result = $this->get($this->baseUrl, 'logout');
	return $result;
}
}
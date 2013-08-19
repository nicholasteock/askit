<!DOCTYPE html>
<head>
	<title>AskIt!</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content>
	<meta name="author" content>
	<link href="img/favicon.png" rel="icon">
	<link rel="stylesheet" type="text/css" href="css/login.css">
	<link rel="stylesheet" type="text/css" href="components/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="components/bootstrap/css/bootstrap-responsive.css">
	<link rel="stylesheet" type="text/css" href="components/font-awesome/css/font-awesome.css">
	<style type="text/css"></style>
</head>
<body>
<div style="height: 100%; position: relative;">
	<div id="login-header">
		<div class="navbar navbar-inverse navbar-static-top">
			<div class="navbar-inner">
				<div class="container">
					<form class="inline-form pull-right" method="post" onsubmit="doLogin();" action="/">
						<input type="text" name="email" id="email" placeholder="Email">
						<input type="password" name="password" id="password" placeholder="Password">
						<button type="submit" id="loginBtn" class="btn btn-primary">Sign In</button>
						<label class="checkbox">
							<input type="checkbox">Remember me
							<a id="forgotPassword" style="margin-left: 20px;">Forgot password?</a>
						</label>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	<div id="login-body">
		<div class="container">
			<div id="welcomeMsg" class="span12">
				Get Your Questions Answered. Fast.
			</div>
			<div id="welcomeImg" class="span6">
				<img src="img/teacher.jpg">
			</div>
			<!-- <div id="newUserFormContainer" class="span6"> -->
				<form id="newUserForm" onsubmit="newLogin();" method="post" class="span5">
					<fieldset>
						<legend>
							Help or Be Helped. Join The Community Now.
						</legend>
						<label>
							First Name
						</label>
						<input type="text" id="newUserFirstName">
						<label>
							Last Name
						</label>
						<input type="text" id="newUserLastName">
						<label>
							Email
						</label>
						<input type="text" name="newUserEmail" id="newUserEmail">
						<label>
							Password
						</label>
						<input type="password" name="newUserPassword" id="newUserPassword">
						<div>
							<button type="button" id="newUserSubmit" class="btn btn-warning btn-large">Sign Up</button>
						</div>
					</fieldset>
				</form>
			<!-- </div> -->
		</div>
	</div>
	
	<div id="login-footer">
		<span>AskIt! Copyright &copy; 2013 - Nicholas Teo</span>
	</div>
</div>
<script src="components/modernizr/jquery-1.9.1.min.js"></script>
<script src="components/modernizr/bootstrap.min.js"></script>
<script src="components/base64/base64.js"></script>
<script id="jqcookieplugin" >
/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html

 */
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1}if(typeof value=='object'&&jQuery.toJSON){value=jQuery.toJSON(value)}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires='; expires='+date.toUTCString()}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}if(jQuery.evalJSON&&cookieValue&&cookieValue.match(/^\s*\{/)){try{cookieValue=jQuery.evalJSON(cookieValue)}catch(e){}}return cookieValue}};
</script>

<script>

var doLogin = function() {
	if( location.hash.length ) {
		$.cookie( "returnUrl", location.hash );
	}
	var params = "params=" + encodeURIComponent(JSON.stringify( { username: $("#email").val(), password: Base64.encode($("#password").val()) } ));
	return true;
};

var newLogin = function() {
	var params = "params=" + encodeURIComponent(JSON.stringify( { username: $("#newUserEmail").val(), password: Base64.encode($("#newUserPassword").val()) } ));
	return true;
};

var newUser = function() {
	var newEmail 	= $("#newUserEmail").val(),
		newFirstName= $("#newUserFirstName").val(),
		newLastName = $("#newUserLastName").val(),
		newPassword = $("#newUserPassword").val(),
		params 		= {};

	if( newEmail == "" || newFirstName == "" || newLastName == "" || newPassword == "" ) {
		console.error("TODO: Blank input error", newEmail, newFirstName, newLastName, newPassword);
		return false;
	}
	else {
		params = 	{
						email: newEmail,
						firstName: newFirstName,
						lastName: newLastName,
						password: newPassword
					};

		$.ajax({
			url 	: "server/newUser.php",
			type 	: "POST",
			data 	: params,
			dataType: "json",
			success : function(response) {
				console.log("success in creating new newUser", response);
				$("#newUserForm").submit();
				
			},
			error 	: function(xhr, status, error) {
				console.log("Error in creating new newUser", xhr);
				alert("Error in creating new user. Response : ", xhr, status, error);
			}
		});
	}
};

$(function() {
	$("#email").focus();
	$("#newUserSubmit").click(function() {return newUser(); });
});

</script>

</body>
</html>

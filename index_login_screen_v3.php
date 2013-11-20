<!DOCTYPE html>
<head>
	<title>AskIt!</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content>
	<meta name="author" content>
	<link href="img/favicon.png" rel="icon">
	<link rel="stylesheet" type="text/css" href="components/bootstrap3/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="components/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/askit_app.css">
	<style type="text/css"></style>
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<h1 class="center">
		<span class="brand">
			ASK <i class="icon-lightbulb"></i> IT!
		</span>
	</h1>
</nav>

<div class="container">

<!---------------------------- MAIN PANEL -------------------------->
<div id="main-panel" class="row" action="signin()">
	<div class="center">
		<h1 class="center">WELCOME TO ASKIT!</h1>
	</div>
	<div class="full center">
		<p><button id="signin-btn" class="btn btn-primary full all-caps">Sign In</button></p>
		<p><button id="signup-btn" class="btn btn-primary full all-caps">Sign Up</button></p>
	</div>
</div>

<!---------------------------- SIGNIN FORM -------------------------->
<div id="signin-panel" class="row hide">
	<div class="center">
		<h1 class="center">WELCOME TO ASKIT!</h1>
	</div>
	<form role="form" method="post" onsubmit="doLogin()" action="/" id="signin-form">
		<div class="field">
	    <input type="email" class="form-control" name="signin-email" id="signin-email" placeholder="EMAIL">
	  </div>
	  <div class="field">
	    <input type="password" class="form-control" name="signin-password" id="signin-password" placeholder="PASSWORD">
	  </div>
	  <div class="center">
	  	<button type="submit" class="btn btn-primary">LOGIN</button>
		</div>
	</form>
</div>

<!---------------------------- SIGNUP FORM -------------------------->
<div id="signup-panel" class="row hide">
	<div class="center">
		<h1 class="center">WELCOME TO ASKIT!</h1>
	</div>
	<form role="form" method="post" onsubmit="newLogin()" action="/" id="signup-form">
		<div class="field">
	    <input type="text" class="form-control" id="signup-firstname" placeholder="First Name">
	    <input type="text" class="form-control" id="signup-lastname" placeholder="Last Name">
	  </div>
	  <div class="field">
	    <input type="email" class="form-control" name="signup-email" id="signup-email" placeholder="Email (This will be your username)">
	  </div>
	  <div class="field">
	    <input type="password" class="form-control" name="signup-password" id="signup-password" placeholder="Password">
	  </div>
	  <div class="field">
	    <input type="password" class="form-control" id="signup-rpassword" placeholder="Repeat Password">
	  </div>
	  <div class="field center">
	  	<button type="button" class="btn btn-primary" id="signup-submit">REGISTER</button>
		</div>
		<div class="field center">
			<button id="signup-msg" class="btn btn-info hide all-caps" disabled>All fields are required</button>
		</div>
	</form>
</div>

<!-- <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
</nav> -->

<script src="components/modernizr/jquery-1.9.1.min.js"></script>
<script src="components/bootstrap3/js/bootstrap.min.js"></script>
<script src="components/base64/base64.js"></script>
<script id="jqcookieplugin">
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
<script type="text/javascript">

	var doLogin = function() {
		var params = "params=" + encodeURIComponent(JSON.stringify( { username: $("#signin-email").val(), password: Base64.encode($("#signin-password").val()) } ));
		return true;
	};

	var newLogin = function() {
		var params = "params=" + encodeURIComponent(JSON.stringify( { username: $("#signup-email").val(), password: Base64.encode($("#signup-password").val()) } ));
		return true;
	};

	var newUser = function() {
		var newEmail 		= $("#signup-email").val(),
				newFirstName= $("#signup-firstname").val(),
				newLastName = $("#signup-lastname").val(),
				newPassword = $("#signup-password").val(),
				params 			= {};

		if( newEmail == "" || newFirstName == "" || newLastName == "" || newPassword == "" ) {
			console.error("TODO: Blank input error", newEmail, newFirstName, newLastName, newPassword);
			$("#signup-msg").html("All fields are required").removeClass("hide");
			return false;
		}
		else {
			$("#signup-msg").addClass("hide");

			params = 	{
							email 		: newEmail,
							firstName : newFirstName,
							lastName 	: newLastName,
							password 	: newPassword
						};

			$.ajax({
				url 	: "server/newUser.php",
				type 	: "POST",
				data 	: params,
				dataType: "json",
				success : function(response) {
					console.log("success in creating new newUser", response);

					if( response.result == "failure" ) {
						$("#signup-msg").html( response.error ).removeClass("hide");
					}
					else {
						$("#signup-form").submit();
					}
				},
				error 	: function(xhr, status, error) {
					console.log("Error in creating new newUser", xhr);
					$("#signup-msg").html("An internal error has occurred.").removeClass("hide");
					alert("Error in creating new user. Response : ", xhr, status, error);
				}
			});
		}
	};

	$("#signin-btn").click( function() {
		$("#main-panel").addClass("hide");
		$("#signin-panel").removeClass("hide");
		$("body").animate({ scrollTop: 0 });
	});

	$("#signup-btn").click( function() {
		$("#main-panel").addClass("hide");
		$("#signup-panel").removeClass("hide");
		$("body").animate({ scrollTop: 0 });
	});

	$("#signup-submit").click( function() {
		return newUser();
	});
</script>
</body>
</html>
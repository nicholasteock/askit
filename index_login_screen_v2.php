<!DOCTYPE html>
<head>
	<title>AskIt!</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content>
	<meta name="author" content>
	<link href="img/favicon.png" rel="icon">
	<link rel="stylesheet" type="text/css" href="components/bootstrap3/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="components/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/login2.css">
	<style type="text/css"></style>
</head>
<body>
<div style="height: 100%; position: relative;">

	<div id="loginNav">
		<span id="loginBtn" class="loginNavItem">Log In</span>
	</div>

	<div id="imgCarousel" class="carousel slide" data-interval="false">
		<div class="carousel-inner">
			<div class="item active">
				<img src="img/bg_0.jpg">
			</div>
			<div class="item">
				<img src="img/bg_0.jpg">
			</div>
			<div class="item">
				<img src="img/bg_0.jpg">
			</div>
			<div class="item">
				<img src="img/bg_0.jpg">
			</div>
		</div>
	</div>

	<div id="captionsCarousel" class="carousel slide" data-interval="false">
		<div class="carousel-inner">
			<div class="item active">
				<div class="captionOverlay">
					<span class="carouselNav carouselPrev">
						<i class="icon-chevron-left"></i>
					</span>
					<span class="captionContainer col-md-6">
						<div class="captionContent">
							<div class="captionSection1">
								Get help quickly when you
							</div>
							<div class="captionSection2">
								ASK
							</div>
						</div>
						<button type="button" class="joinBtn">Join Now</button>
					</span>
					<span class="carouselNav carouselNext">
						<i class="icon-chevron-right"></i>
					</span>
				</div>
			</div>
			<div class="item">
				<div class="captionOverlay">
					<span class="carouselNav carouselPrev">
						<i class="icon-chevron-left"></i>
					</span>
					<span class="captionContainer col-md-6">
						<div class="captionContent">
							<div class="captionSection1">
								Earn rewards and learn when you
							</div>
							<div class="captionSection2">
								ANSWER
							</div>
						</div>
						<button type="button" class="joinBtn">Join Now</button>
					</span>
					<span class="carouselNav carouselNext">
						<i class="icon-chevron-right"></i>
					</span>
				</div>
			</div>
			<div class="item">
				<div class="captionOverlay">
					<span class="carouselNav carouselPrev">
						<i class="icon-chevron-left"></i>
					</span>
					<span class="captionContainer col-md-6">
						<div class="captionContent">
							<div class="captionSection1">
								Hire tutors based on
							</div>
							<div class="captionSection2">
								CREDIBILITY
							</div>
						</div>
						<button type="button" class="joinBtn">Join Now</button>
					</span>
					<span class="carouselNav carouselNext">
						<i class="icon-chevron-right"></i>
					</span>
				</div>
			</div>
			<div class="item">
				<div class="captionOverlay">
					<span class="carouselNav carouselPrev">
						<i class="icon-chevron-left"></i>
					</span>
					<span class="captionContainer col-md-6">
						<div class="captionContent">
							<div class="captionSection1">
								Prove yourself through
							</div>
							<div class="captionSection2">
								RESULTS
							</div>
						</div>
						<button type="button" class="joinBtn">Join Now</button>
					</span>
					<span class="carouselNav carouselNext">
						<i class="icon-chevron-right"></i>
					</span>
				</div>
			</div>
		</div>
	</div>


</div>

<!-- New User Registration Modal -->
<div class="modal fade" id="newUserModal" tabIndex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
				<h4 class="modal-title">New User Registration</h4>
			</div>
			<div class="modal-body">
				<span class="col-lg-6">
					<button type="button">button1</button>
					<br>
					<button type="button">button2</button>
				</span>
				<span class="col-lg-6">
					<form id="newUserForm" role="form" method="post" onsubmit="newLogin();" class="form-horizontal" action="/">
						<div class="form-group">
							<label for="newUserFirstName" class="col-lg-4 control-label">First Name : </label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="newUserFirstName" name="newUserFirstName">
							</div>
						</div>
						<div class="form-group">
							<label for="newUserLastName" class="col-lg-4 control-label">Last Name : </label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="newUserLastName" name="newUserLastName">
							</div>
						</div>
						<div class="form-group">
							<label for="newUserEmail" class="col-lg-4 control-label">Email : </label>
							<div class="col-lg-8">
								<input type="email" class="form-control" id="newUserEmail" name="newUserEmail">
							</div>
						</div>
						<div class="form-group">
							<label for="newUserPassword" class="col-lg-4 control-label">Password : </label>
							<div class="col-lg-8">
								<input type="password" class="form-control" id="newUserPassword" name="newUserPassword">
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-8 col-lg-offset-4">
								<div>
									<span><button type="button" id="newUserSubmit" class="btn btn-warning">Register</button></span>
									<span><i id="newUserSpinner" class="icon-spinner icon-spin hidden"></i></span>
								</div>
								<div id="newUserErrorMsg" class="hidden">
								</div>
							</div>
						</div>
					</form>
				</span>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
</div>

<script src="components/modernizr/jquery-1.9.1.min.js"></script>
<script src="components/bootstrap3/js/bootstrap.min.js"></script>
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
<script type="text/javascript">
	$(document).ready(function() {
		$("#loginBtn").popover({
			animation 	: false,
			html 		: true,
			placement 	: "bottom",
			trigger 	: "click",
			title 		: '<h4>Sign In</h4>',
			content 	: '<form id="loginForm" class="form-horizontal" role="form" method="post" onsubmit="doLogin();" action="/"><div class="form-group"><label for="email" class="col-lg-4 control-label">Email : </label><div class="col-lg-8"><input type="email" class="form-control" id="email" name="email"></div></div><div class="form-group"><label for="password" class="col-lg-4 control-label">Password : </label><div class="col-lg-8"><input type="password" class="form-control" id="password" name="password"></div></div><div class="form-group"><div class="col-lg-offset-4 col-lg-8"><button type="submit" class="btn btn-default">Submit</button></div></div></form>'
		});
	});

	var doLogin = function() {
		if( location.hash.length ) {
			$.cookie( "returnUrl", location.hash );
		}
		var params = "params=" + encodeURIComponent(JSON.stringify( { username: $("#email").val(), password: Base64.encode($("#password").val()) } ));
		return true;
	};

	var newLogin = function() {
		console.log("In newLogin function.", $("#newUserEmail").val() );
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
			$("#newUserSpinner").addClass("hidden");
			$("#newUserErrorMsg").html("*All fields are required.").removeClass("hidden");
			return false;
		}
		else {
			$("#newUserErrorMsg").addClass("hidden");

			params = 	{
							email 		: newEmail,
							firstName 	: newFirstName,
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
					$("#newUserSpinner").addClass("hidden");

					if( response.result == "failure" ) {
						$("#newUserErrorMsg").html( response.error ).removeClass("hidden");
					}
					else {
						$("#newUserForm").submit();
					}
				},
				error 	: function(xhr, status, error) {
					console.log("Error in creating new newUser", xhr);
					$("#newUserSpinner").addClass("hidden");
					$("#newUserErrorMsg").html("An internal error has occurred.").removeClass("hidden");
					alert("Error in creating new user. Response : ", xhr, status, error);
				}
			});
		}
	};

	// Carousel functionality
	var clickNext 	= function() {
		$(".carouselNext:visible").click();
	}

	var slideDelay 	= 5000,
		autoSlide 	= setTimeout( function() { clickNext(); }, slideDelay );
	
	$("#captionsCarousel").on("slid.bs.carousel", function() {
		clearTimeout(autoSlide);
		autoSlide 	= setTimeout( function() { clickNext(); }, slideDelay );
	});

	$(".carouselPrev").click( function() {
		$(".captionOverlay").fadeOut(300).delay(300);
		$("#captionsCarousel").carousel("prev");
		$("#imgCarousel").carousel("prev");
		$(".captionOverlay").fadeIn(1300);
	});

	$(".carouselNext").click( function() {
		$(".captionOverlay").fadeOut(300).delay(300);
		$("#captionsCarousel").carousel("next");
		$("#imgCarousel").carousel("next");
		$(".captionOverlay").fadeIn(1300);
	});

	$("#newUserModal").on("show.bs.modal", function() {
		clearTimeout(autoSlide);
	});

	$("#newUserModal").on("hide.bs.modal", function() {
		autoSlide 	= setTimeout( function() { clickNext(); }, slideDelay );
	});

	$("#newUserSubmit").click( function() {
		$("#newUserSpinner").removeClass("hidden");
		return newUser();
	});

	$(".joinBtn").click( function() {
		$("#newUserModal").modal();
	});
</script>
</body>
</html>
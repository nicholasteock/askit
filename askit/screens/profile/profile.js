Screen.extend("Profile",
{
	init: function( el, options ) {
		this.className = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html( "askit_screens_common_common_stage", { title: "Profile" } );
		$(".stageContent").html( "askit_screens_profile_profile_view", app.currentUser.profile() );
	},

	"input click": function() {
		$("#updateProfileBtn").html("Update Profile").removeClass("disabled updateSuccess updateError");
		$("#updatePasswordBtn").html("Change Password").removeClass("disabled updateSuccess updateError")
	},

	"#updateProfileBtn click": function() {
		var validInput 		= 	true,
			emailRef 		= 	$("#profileEmail"),
			firstNameRef  	= 	$("#profileFirstName"),
			lastNameRef 	= 	$("#profileLastName"),
			email 			= 	emailRef.val(),
			newFirstName 	= 	firstNameRef.val(),
			newLastName 	= 	lastNameRef.val(),
			params 			= 	{
									firstName 	: newFirstName,
									lastName 	: newLastName,
									email 		: email,
								};

		$("#updateProfileBtn").html("Updating...").addClass("disabled");
		$("input").removeClass("invalidInput");
		$(".profileErrMsg").html("");

		if( newFirstName === app.currentUser.firstName &&
			newLastName === app.currentUser.lastName )
		{
			$("#updateProfileBtn").html("Updated!").addClass("updateSuccess");
			return;
		}

		if( newFirstName === "" ) {
			$("#updateProfileBtn").html("Update Profile").removeClass("disabled updateSuccess updateError");
			$("#firstNameErrMsg").html("<i class='icon-remove-sign'> </i> Field is empty.")
			firstNameRef.addClass("invalidInput");
			validInput = false;
		}

		if( newLastName === "" ) {
			$("#updateProfileBtn").html("Update Profile").removeClass("disabled updateSuccess updateError");
			$("#lastNameErrMsg").html("<i class='icon-remove-sign'> </i> Field is empty.")
			lastNameRef.addClass("invalidInput");
			validInput = false;
		}

		if( validInput ) {
			$.when(
				app.currentUser.updateProfile( params )
			).then(
				this.proxy( this.onUpdateProfileDone ),
				this.proxy( this.onUpdateProfileFail )
			);
		}
	},

	onUpdateProfileDone: function( response ) {
		$("#updateProfileBtn").html("Updated!").addClass("updateSuccess");
	},

	onUpdateProfileFail: function( response ) {
		console.log( "In onUpdateProfileFail. Response is : ", response );
		$("#updateProfileBtn").html("Error!").addClass("updateError");
		$("#updateProfileErrMsg").html("Please try again")
		return;
	},

	"#updatePasswordBtn click": function() {
		var validInput 	= 	true,
			currPwdRef 	= 	$("#passwordCurrent"),
			newPwd1Ref 	= 	$("#passwordNew1"),
			newPwd2Ref 	= 	$("#passwordNew2"),
			email 		= 	$("#profileEmail").val(),
			currPwd 	= 	currPwdRef.val(),
			newPwd1 	= 	newPwd1Ref.val(),
			newPwd2 	= 	newPwd2Ref.val(),
			params 		= 	{
								email 	: email,
								currPwd : currPwd,
								newPwd 	: newPwd1 
							};

		$("#updatePasswordBtn").html("Updating...").addClass("disabled");
		$("input").removeClass("invalidInput");
		$(".profileErrMsg").html("");

		if( currPwd === "" ) {
			$("#updatePasswordBtn").html("Change Password").removeClass("disabled updateSuccess updateError");
			$("#currPwdErrMsg").html("<i class='icon-remove-sign'> </i> Field is empty")
			currPwdRef.addClass("invalidInput");
			validInput = false;
		}

		if( newPwd1 === "" ) {
			$("#updatePasswordBtn").html("Change Password").removeClass("disabled updateSuccess updateError");
			$("#newPwd1ErrMsg").html("<i class='icon-remove-sign'> </i> Field is empty")
			newPwd1Ref.addClass("invalidInput");
			validInput = false;
		}

		if( newPwd2 === "" ) {
			$("#updatePasswordBtn").html("Change Password").removeClass("disabled updateSuccess updateError");
			$("#newPwd2ErrMsg").html("<i class='icon-remove-sign'> </i> Field is empty")
			newPwd2Ref.addClass("invalidInput");
			validInput = false;
		}

		if( validInput && newPwd1 !== newPwd2 ) {
			$("#updatePasswordBtn").html("Change Password").removeClass("disabled updateSuccess updateError");
			$("#newPwd1ErrMsg").html("<i class='icon-remove-sign'> </i> Passwords do not match")
			newPwd1Ref.addClass("invalidInput");
			newPwd2Ref.addClass("invalidInput");
			validInput = false;
		}

		// if( validInput && !verifyPwd( currPwd ) ) {
		// 	$("#updatePasswordBtn").html("Change Password").removeClass("disabled updateSuccess updateError");
		// 	$("#currPwdErrMsg").html("<i class='icon-remove-sign'> </i> Password Invalid")
		// 	currPwdRef.addClass("invalidInput");
		// 	validInput = false;
		// }

		if( validInput ) {
			$.when(
				app.currentUser.updatePassword( params )
			).then(
				this.proxy( this.onUpdatePasswordDone ),
				this.proxy( this.onUpdatePasswordFail )
			);
		}
	},

	onUpdatePasswordDone: function( response ) {
		$("#updatePasswordBtn").html("Updated!").addClass("updateSuccess");
	},

	onUpdatePasswordFail: function( response ) {
		console.log( "In onUpdatePasswordFail. Response is : ", response );
		$("#updatePasswordBtn").html("Error!").addClass("updateError");
		$("#updatePwdErrMsg").html("Please try again");
		return;
	},

});
window.routes["/profile"] = Profile;
$.Model("User",
{
	// whoami: function(accessToken, success, error) {
	// 	new ASKITAPI({
	// 		url: "whoami",
	// 		success: success,
	// 		error: error
	// 	}).call();
	// },

	// logout: function() {
	// 	new ASKITAPI({
	// 		url: "logout"
	// 	}).fireAndForget();
	// },
},
{
	init: function() {
		return;
	},

	lastFirstName: function() {
		return this.lastName + ", " + this.firstName;
	},

	firstLastName: function() {
		return this.firstName + ", " + this.lastName;
	},

	shortUserName: function() {
		var name = this.username,
			pos = this.username.indexOf("@");

		if(pos>1) {
			name = name.substring( 0, pos );
		}
		return name;
	},

	profile: function() {
		return {
			firstName 	: this.firstName,
			lastName 	: this.lastName,
			email 		: this.email
		};
	},

	updateProfile: function( params ) {
		console.log("User.updateProfile", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response );
			}
			else {
				return onError( response );	
			}
		};

		var onError = function( response ) {
			return dfdResult.reject( response );
		};

		$.ajax({
			url 		: "server/updateProfile.php",
			type 		: "POST",
			dataType 	: "json",
			data 		: params,
			success 	: onSuccess,
			error 		: onError
		});

		return dfdResult;
	},

	updatePassword: function( params ) {
		console.log("User.updatePassword");

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response );
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject( response );
		};

		$.ajax({
			url 		: "server/updatePassword.php",
			type 		: "POST",
			dataType 	: "json",
			data 		: params,
			success 	: onSuccess,
			error 		: onError
		});

		return dfdResult;
	},
});
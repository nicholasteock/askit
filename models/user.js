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
});
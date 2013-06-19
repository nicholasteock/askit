Screen.extend( "Askitapplication",	//handles static functions
{
	init: function( el, options ) {
		this.window = $(window);
	},
	
	// Main nav
	"#menu-dashboard click": function( el, ev ) {
		ev.preventDefault();
		if( window.location.hash.indexOf("#/dashboard") >= 0 || window.location.hash.indexOf("#dashboard") >= 0) {
					app.showScreen();
		}
		else {
			app.setLocation("/dashboard/");
		}
	},
	
	"#menu-ask click": function( el, ev ) {
		//ev.preventDefault();
	},
	
	
	"#menu-answer click": function( el, ev ) {
		//ev.preventDefault();
	},
	
	
	"#menu-practice click": function( el, ev ) {
		//ev.preventDefault();
	},
	
	
	"#menu-hire click": function( el, ev ) {
		//ev.preventDefault();
	},
});

/**application.js Primary Usage***********************************************************************/
/**
 * 		init: creates references to the global dom elements etc.
 * 
 * 		showScreen: 1. This function will create a route object with two properties routeName and params. e.g.{ routeName: "mediaPlanning/tv" , ... }
 * 					2. and will then try to find the controller for the route name ( the mapping is configured in each controller file window.routes["/mediaPlanning/tv/"] = MediaPlanningTv ) and create an instance of the controller class.
 * 					3. if there is no configured controller for the class then, the screen will just write an error to the server and return, the net effect being nothing will happen in the ui for routes not configured.
 * 					NOTE: Once the controller is instanced in theScreen function, the responsibility of the app.routing mechanism ends, and is the individual controllers init function is invoked which has all the authorithy and responsibility to determine how it should render itsself. e.g. if it requires any selections for it to work.
 *
 **/ 
/*****************************************************************************************************/
$.Class("Askit.Application", {

	defaultPageTitle: "AskIt!",

},
{
	init: function() {
		//save references of global elements
		this.routes			= {};
		this.currentScreen 	= {};
		this.currentUser	= {};
		this.accessToken	= $.cookie("accessToken");

		this._header		= $("#ai-header");
		this._body			= $("#ai-body");
		this._window		= $(window);

		this._changeTemplateExtension("html");
	},

	authenticateUser: function() {
		if( location.hash ) {
			$.cookie( "returnUrl", location.hash );
		}

		window.top.location = "/";
	},

	// Clears user session info. Goes back to sign in page.
	signout: function(el, ev) {
		console.log("SIGNING OUT");
		if( ev && ev.preventDefault ) {
			ev.preventDefault();
		}

		// Inform the server and remove user.
		if( this.currentUser.firstName ) {
			//this.currentUser.logout();
			this.currentUser = {};
		}

		$.cookie("accessToken", null);
		delete app.accessToken;

		// Redirect user back to the login screen.
		this.authenticateUser();
	},
	
	run: function() {
		if( !this.currentUser.email ) {
			this.authenticateUser();
		}

		this._aiApp = new Askitapplication( $("body") );

		this._window.bind("hashchange", this.proxy(this.showScreen));
		this.registerRoute("/", Askit.RouteHelper.defaultPageController);
		if(window.routes) {
			for(var route in window.routes) {
				this.registerRoute(route, window.routes[route]);
				delete window.routes[route];
			}
		}

		this.restoreLocationAndStateOnAppStart();
	},

	restoreLocationAndStateOnAppStart: function() {
		var checkJustLoggedIn 	= $.cookie( "justLoggedIn" ),
			checkReturnUrl		= $.cookie( "returnUrl" ),
			newHash;

		//TODO: restoreState functionality (if required)

		if( location.hash.length > 0 ) {
			newHash = location.hash;
		}
		else if( checkJustLoggedIn && checkReturnUrl ) {
			newHash = checkReturnUrl;
		}
		else {
			newHash = "/";
		}

		// Delete cookies
		$.cookie( "returnUrl", null );
		$.cookie( "justLoggedIn", null );

		if( newHash === location.hash ) {
			app.showScreen();
		}
		else {
			app.setLocation( newHash );
		}

	},

	setLocation: function(hash, params, replaceParams) {
		location.hash = hash;
	},

	// Used to reload a screen if there is no hash change.
	reloadLocation: function() {
		app.showScreen();
	},
	
	showScreen: function(){
		// Close any modal dialogs or popups
		$(".ui-dialog").remove();
		$(".ui-widget-overlay").remove();
		$(".popup").hide();
		$(".tipsy").remove();
		
		var routeInfo = Askit.RouteHelper.getRouteObjectFromUrlHash( location.hash ),
			controller = this.routes[routeInfo.routeName];
		if(controller) {
			this.createController( controller, { route: routeInfo } );
		}
		else {
			console.error("app.showScreen No screen found for " + location + ", redirecting to / " );
		}
	},

	showLoader: function() {
		$("#loader").removeClass("hide");
		$(".pageDetailsContainer").addClass("hide");
		return;
	},

	hideLoader: function() {
		$("#loader").addClass("hide");
		$(".pageDetailsContainer").removeClass("hide");
		return;
	},

	registerRoute: function(address, controller) {
		//~ console.log("In registerRoute:   ", address, controller);
		address = this._normalizeHash(address);
		this.routes[address] = controller;
	},
	
	_normalizeHash: function(hash) {
		/*
		private
		Normalizes a URL hash string value by stripping off trailing slashes
		and leading slashes and pound characters (inluding hashbang). So,
		"#/part1/part2/" becomes "part1/part2"
		*/
		hash = hash.replace(new RegExp("^[#/|#!/]+|/$", "g"), "");

		// But if nothing is left, let's be a single "/". This
		// is because the normalized hash value is used as a key,
		// and empty strings totally suck as keys (will throw, in fact).
		if (hash.length === 0) {
			hash = "/";
		}
		return hash;
	},
	
	createController: function( theScreen, options ) {
		var wrapper = $('<div id="' + theScreen.shortName + '" ></div>');
			ht = $(window).height()-150;
		
		wrapper.css("min-height", ht);
		
		var oScreen = new theScreen(wrapper, options);
		this.currentScreen = oScreen;
	},
	
	setStage: function(html) {
		$("#ai-stage").empty().append(html);
	},
	
	_changeTemplateExtension: function(ext) {
		
		$.View.register({
			suffix: ext,
			//returns a function that renders the view
			script: function( id, src ) {
				return "jQuery.EJS(function(_CONTEXT,_VIEW) { " + new EJS({
					text: src,
					name: id
				}).template.out + " })";
			},
			renderer: function( id, text ) {
				var ejs = new EJS({
					text: text,
					name: id
				});
				return function( data, helpers ) {
					return ejs.render.call(ejs, data, helpers);
				};
			}
		});
	},

	preventBackspaceNavigation: function(ev) {
		if( ev.target.tagName == "BODY"
			&& ev.which == 8
			&& !((ev.ctrlKey || ev.metaKey) && ev.shiftKey )) {
			return false;
		}
	},
});

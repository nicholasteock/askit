Screen.extend("Dashboard",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html( "askit_screens_dashboard_dashboard_view", {} );
	},
});
//~ window.routes["/"] = Dashboard;
window.routes["/dashboard"] = Dashboard;

Screen.extend("Homepage",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html( "askit_screens_homepage_homepage_view", {} );
	},
});
window.routes["/"] = Homepage;
window.routes["/home"] = Homepage;

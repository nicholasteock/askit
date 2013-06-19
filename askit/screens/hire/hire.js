Screen.extend("Hire",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html( "askit_screens_hire_hire_view", {} );
	},
});
window.routes["/hire"] = Hire;


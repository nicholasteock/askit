Screen.extend("Practice",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html( "askit_screens_practice_practice_view", {} );
	},
});
window.routes["/practice"] = Practice;

/*
 * Screen options:
 * 	this.title				//Text for windoes titlebar
 *	this.stageCssClass		//Css classes that should be added to stage. Prefix with "aiscreen-"
 *	this.layout = false		//Set this to prevene layout errors. "layout not initialized".
 * 
*/

(function( window, $ ) {
	var removeStageCss = function() {
		var classes = Screen.stage.attr("class");
		if( !classes )
			return;
		var matches = classes.match(/\aiscreen-\w+\b/g);
		
		//Remove screen classes as necessary
		if( matches ) {
			for( var n=0, nLen=matches.length; n<nLen; n++) {
				Screen.stage.removeClass(matches[n]);
			}
		}
		//~ Screen.stage.removeClass("ui-state-busy");
	};
	
	var scrollToTop = function() {
		if( window.scrollTo && window.scrollY && window.scrollY>0 ){
			window.scrollTo( 0, 0 );
		}
	};
	
	var mnuItems = $("#menu-main-nav li a");
	var mnuDashboard = $("#menu-dashboard");
	var mnuAsk = $("#menu-ask");
	var mnuAnswer = $("#menu-answer");
	var mnuPractice = $("#menu-practice");
	var mnuHire = $("#menu-hire");
	
	var updateTopBar = function( ctl ){
		mnuItems.removeClass("selected");
		switch( ctl.classname ) {
			case "Dashboard" :
				mnuDashboard.addClass("selected");
				break;
			case "Ask" :
				mnuAsk.addClass("selected");
				break;
			case "Answer" :
				mnuAnswer.addClass("selected");
				break;
			case "Practice" :
				mnuPractice.addClass("selected");
				break;
			case "Hire" :
				mnuHire.addClass("selected");
				break;
			default:
				break;
		}
	};
	
$.Controller("Screen", {
	stage	: $("#ai-stage"),
},
{
	__base__fadeInSpeed: 1,
	__base__setupDefaultStage: function() {
		if( !this.element ){
			console.error("screen.js: Invalid view template");
			throw new Error("screen.js: Invalid view template");
		}
		updateTopBar( this );
		removeStageCss();
		app.setStage(this.element);
		scrollToTop();
		
		if( this.stageCssClass ){
			Screen.stage.addClass( this.stageCssClass );
		}
	},
});

})( window, $ );












Screen.extend("Dashboard",
{
  init: function( el, options ){
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();   //screens.js
    this.element.html( "askit_screens_common_common_stage_v3", { title: ""} );
    $(".stageContent").html( "askit_screens_dashboard_dashboard_view_v3", { name: app.currentUser.firstLastName() } );
    $(".mainMenu").collapse('hide'); // Hides dropdown nav
    app.hideLoader();
  },

  "#db_ask_button click": function( el, ev ) {
    app.setLocation( '/ask' );
  },

  "#db_view_button click": function( el, ev ) {
    app.setLocation( '/answer' );
  }

});
window.routes["/"] = Dashboard;
window.routes["/dashboard"] = Dashboard;

Screen.extend("Rewards",
{
  init: function( el, options ){
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();   //screens.js
    this.element.html( "askit_screens_common_common_stage_v3", { title: ""} );
    $(".stageContent").html( "askit_screens_rewards_rewards_view_v3", {} );
    $(".mainMenu").collapse('hide'); // Hides dropdown nav
    app.hideLoader();
  },

});
window.routes["/rewards"] = Rewards;

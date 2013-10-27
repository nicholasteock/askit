Screen.extend("Sandbox",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Sandbox" } );
    $(".stageContent").html( "askit_screens_sandbox_sandbox_view", {} );
    $(".mainMenu").collapse('hide'); // Hides dropdown nav
    this.initFileUpload();
  },

  initFileUpload: function() {
    console.log("initialisign file image input");
    // $("#testForm").fileupload( {
    //     singleFileUploads: true,
    //     autoUpload: true
    // });
  }
});
window.routes["/sandbox"] = Sandbox;
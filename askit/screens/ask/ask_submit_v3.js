/*******************************  ASK FLOW (STAGE 3/3)  *******************************

1.  This page grabs the information captured in workflow and makes the submit call.
2.  View shown depends on the result of the submission.
3a  Success case:
    - Screen shows success, presents 2 buttons to ask another question or go to home.
3b  Fail case
    - Screen shows failure, presents 3 buttons to try again, ask another question or
      go to home. 

************************************************************************************/

Screen.extend("AskSubmit",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    this.element.html( "askit_screens_common_common_stage_v3", { title: "" } );
    $(".mainMenu").collapse('hide'); // Hides dropdown nav

    this.submitQuestion();
  },

  submitQuestion: function() {
    if( typeof qnWorkflow == "undefined" ) {
      console.log("User came into submit without permission.");
      app.setLocation("/dashboard");
      return;
    }
    $.when(
      QuestionModel.create(qnWorkflow)
    ).then(
      this.proxy( this.onSubmitQnDone ),
      this.proxy( this.onSubmitQnFail )
    );
  },

  onSubmitQnDone: function( response ) {
    qnWorkflow = {};
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Question Submitted!" } );
    $(".stageContent").html("askit_screens_ask_ask_submit_success_view_v3", {});
    app.hideLoader();
    return;
  },

  onSubmitQnFail: function( response ) {
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Oops!" } );
    $(".stageContent").html("askit_screens_ask_ask_submit_fail_view_v3", {});
    app.hideLoader();
    return;
  },

  ".ask_back click": function() {
    var method = qnWorkflow.method;
    qnWorkflow.edit = true;
    app.setLocation("/ask?method=" + method);
    return;
  },

  ".ask_another_question click": function() {
    qnWorkflow = {};
    app.setLocation("/ask");
    return;
  },

  ".ask_go_home click": function() {
    qnWorkflow = {};
    app.setLocation("/dashboard");
    return;
  },

});
window.routes["/ask/submit"] = AskSubmit;
Screen.extend("Answer",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    $(".mainMenu").collapse("hide");
    
    if( options.route.params.qnId ) {
      this.element.html( "askit_screens_common_common_stage_v3", { title: "Answer Question"} );
      var qnId = options.route.params.qnId;
      ansWorkflow       = {};
      ansWorkflow.qnId  = qnId;
      this.loadSingleQuestion( qnId );
    }
    else {
      ansWorkflow = {};
      this.element.html( "askit_screens_common_common_stage_v3", { title: "Question Trove"} );
      this.loadAllQuestions();
    }
  },

  loadSingleQuestion: function( qnId ) {
    $.when(
      QuestionModel.findQuestionById( { qnId: qnId } )
    ).then(
      this.proxy( this.onLoadSingleQuestionDone ),
      this.proxy( this.onLoadSingleQuestionFail )
    );
  },

  onLoadSingleQuestionDone: function( response ) {
    console.log("In onLoadSingleQuestionDone. Reponse is : ", response);
    $(".stageContent").html("askit_screens_answer_answer_qn_view_v3", response.data);
    app.hideLoader();
    return;
  },

  onLoadSingleQuestionFail: function( response ) {
    console.log("In onLoadSingleQuestionFail. Response is : ", response);
    // $(".stageContent").html("askit_screens_answer_answer_invalid_question_view_v3.html", response);
    return;
  },

  loadAllQuestions: function() {
    $.when(
      QuestionModel.findAll()
    ).then(
      this.proxy( this.onLoadAllQuestionsDone ),
      this.proxy( this.onLoadAllQuestionsFail )
    );
  },

  onLoadAllQuestionsDone: function( response ) {
    console.log( "In onLoadQuestionsDone. Response : ", response );
    app.hideLoader();

    $(".stageContent").html("askit_screens_answer_answer_view_v3", response );
    return;
  },

  onLoadAllQuestionsFail: function( response ) {
    console.log( "In onLoadQuestionsFail. Response : ", response );
    app.hideLoader();
    return;
  },

  ".answer-button click": function( el, ev ) {
    var buttonId  = $(el).attr( "id" ),
        qnId      = buttonId.substring(14);
    app.setLocation( "/answer?qnId=" + qnId );
  },

  ".toggle-qn click": function( el, ev ) {
    $(".toggle-qn").toggleClass("hide");
    $("#answer-qn-content").toggleClass("hide");
  },

  ".answer-submit click": function( el, ev ) {
    var answerTextContent = $("#answer_text_content").val(),
        buttonId  = $(el).attr( "id" ),
        qnId      = buttonId.substring(14),
        params    = {
                      id      : qnId,
                      content : answerTextContent,
                      author  : app.currentUser.id
                    };
        
    if( answerTextContent == "" ) {
      $("#answer-msg").html("Your answer cannot be empty!").removeClass("hide");
      return;
    }

    this.submitAnswer( params );
  },

  submitAnswer: function( params ) {
    $.when(
      AnswerModel.create( params )
    ).then(
      this.proxy( this.onSubmitAnsDone ),
      this.proxy( this.onSubmitAnsFail )
    );
  },

  onSubmitAnsDone: function( response ) {
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Answer Submitted!" } );
    $(".stageContent").html("askit_screens_answer_answer_submit_success_view_v3", {});
    app.hideLoader();
  },

  onSubmitAnsFail: function( response ) {
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Oops!" } );
    $(".stageContent").html("askit_screens_answer_answer_submit_fail_view_v3", {});
    app.hideLoader();
  },

  ".answer_back click": function() {
    app.setLocation( "/answer?qnId=" + ansWorkflow.qnId );
    return;
  },

  ".answer_another_question click": function() {
    ansWorkflow = {};
    app.setLocation("/answer");
    return;
  },

  ".answer_go_home click": function() {
    ansWorkflow = {};
    app.setLocation("/dashboard");
    return;
  },
});
window.routes["/answer"] = Answer;
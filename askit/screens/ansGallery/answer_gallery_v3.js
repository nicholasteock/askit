Screen.extend("AnswerGallery",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    $(".mainMenu").collapse("hide"); // Hides dropdown nav
    viewQuestionFlow = { qnLoaded: false, ansLoaded: false, qnError: false, ansError: false };

    if( options.route.params.ansId ) {
      var ansId = options.route.params.ansId;
      this.loadQuestion( ansId );
      this.loadAnswer( ansId );
      this.element.html( "askit_screens_common_common_stage_v3", { title: "View Answer" } );
    }
    else {
      this.loadUserAnswers();
      this.element.html( "askit_screens_common_common_stage_v3", { title: "Your Answers" } );
    }
  },

  loadQuestion: function( ansId ) {
    var params = {
      userId: app.currentUser.id,
      ansId: ansId
    };

    $.when(
      QuestionModel.findQuestionByAnsId(params)
    ).then(
      this.proxy( this.onLoadQuestionDone ),
      this.proxy( this.onLoadQuestionFail )
    )
  },

  onLoadQuestionDone: function( response ) {
    console.log("In onLoadQuestionDone. Response : ", response);
    viewQuestionFlow.question = response[0];
    viewQuestionFlow.qnLoaded = true;
    this.renderQuestionAnswerView();
    return;
  },

  onLoadQuestionFail: function( response ) {
    console.error("In onLoadQuestionFail. Response : ", response );
    viewQuestionFlow.qnLoaded = true;
    viewQuestionFlow.qnError  = true;
    this.renderQuestionAnswerView();
    return;
  },

  loadAnswer: function( ansId ) {
    var params = {
      userId: app.currentUser.id,
      ansId: ansId
    };

    $.when(
      AnswerModel.findAnswerById(params)
    ).then(
      this.proxy( this.onLoadAnswerDone ),
      this.proxy( this.onLoadAnswerFail )
    )
  },

  onLoadAnswerDone: function( response ) {
    console.log("In onLoadAnswerDone. Response : ", response );
    viewQuestionFlow.answer     = response[0];
    viewQuestionFlow.ansLoaded  = true;
    this.renderQuestionAnswerView();
    return;
  },

  onLoadUserAnswerFail: function( response ) {
    console.error("In onLoadAnswerFail. Response : ", response );
    viewQuestionFlow.ansLoaded  = true;
    viewQuestionFlow.ansError   = true;
    this.renderQuestionAnswerView();
    return;
  },

  loadUserAnswers: function() {
    var params = {
      userId: app.currentUser.id
    };

    $.when(
      AnswerModel.findAllByUserId(params)
    ).then(
      this.proxy( this.onLoadUserAnswersDone ),
      this.proxy( this.onLoadUserAnswersFail )
    );
  },

  onLoadUserAnswersDone: function( response ) {
    console.log("In onLoadUserAnswersDone. Response is : ", response );
    $(".stageContent").html("askit_screens_ansGallery_answer_gallery_view_v3", response);
    app.hideLoader();
    return;
  },

  onLoadUserAnswersFail: function( response ) {
    console.error("In onLoadUserAnswersFail. Response is : ", response );
    return;
  },

  renderQuestionAnswerView: function() {
    if( viewQuestionFlow.qnLoaded && viewQuestionFlow.ansLoaded ) {
      if( viewQuestionFlow.qnError || viewQuestionFlow.ansError ) {
        console.error("Error in rendering question.");
        return;
      }
      $(".stageContent").html("askit_screens_ansGallery_answer_details_view_v3", viewQuestionFlow);
      app.hideLoader();
    }
  },

  ".view-details-button click": function( el, ev ) {
    var buttonId  = $(el).attr( "id" ),
        ansId     = buttonId.substring(20);
    app.setLocation( "/yourAnswers?ansId=" + ansId );
  },

  ".toggle-qn click": function( el, ev ) {
    $(".toggle-qn").toggleClass("hide");
    $("#your-ans-qn-content").toggleClass("hide");
    return;
  },

  ".your-ans-back-button click": function() {
    app.setLocation( "/yourAnswers" );
  },

  ".go_home click": function() {
    app.setLocation( "/dashboard" );
  },
});
window.routes["/yourAnswers"] = AnswerGallery;
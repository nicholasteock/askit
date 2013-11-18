Screen.extend("QuestionGallery",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    $(".mainMenu").collapse('hide'); // Hides dropdown nav
    viewAnswerFlow = { qnLoaded: false, ansLoaded: false, qnError: false, ansError: false };

    if( options.route.params.qnId ) {
      var qnId = options.route.params.qnId;
      this.loadQuestion( qnId );
      this.loadAnswers( qnId );
      this.currentAnswer = 0;
      this.element.html( "askit_screens_common_common_stage_v3", { title: "Answers"} );
    }
    else {
      this.loadUserQuestions();
      this.element.html( "askit_screens_common_common_stage_v3", { title: "Your Questions"} );
    }
  },

  loadQuestion: function( qnId ) {
    var params = {
      qnId: qnId
    };

    $.when(
      QuestionModel.findQuestionById( params )
    ).then(
      this.proxy( this.onLoadQuestionDone ),
      this.proxy( this.onLoadQuestionFail )
    );
  },

  onLoadQuestionDone: function( response ) {
    console.log("In onLoadQuestionDone. Response is : ", response);
    viewAnswerFlow.question = response.data[0];
    viewAnswerFlow.qnLoaded = true;
    this.renderQuestionAnswerView();
    return;
  },

  onLoadQuestionFail: function( response ) {
    console.log("In onLoadQuestionFail. Response is : ", response);
    viewAnswerFlow.qnLoaded = true;
    viewAnswerFlow.qnError  = true;
    return;
  },

  loadAnswers: function( qnId ) {
    var params = {
      qnId: qnId
    };

    $.when(
      AnswerModel.findAllByQuestionId( params )
    ).then(
      this.proxy( this.onLoadQuestionAnswersDone ),
      this.proxy( this.onLoadQuestionAnswersFail )
    );
  },

  onLoadQuestionAnswersDone: function( response ) {
    console.log("In onLoadQuestionAnswersDone. Response is: ", response.data );
    viewAnswerFlow.answers      = response.data;
    viewAnswerFlow.ansLoaded    = true;
    this.renderQuestionAnswerView();
    return;
  },

  onLoadQuestionAnswersFail: function( response ) {
    console.log("In onLoadQuestionAnswersFail. Response is : ", response );
    viewAnswerFlow.ansLoaded  = true;
    viewAnswerFlow.ansError   = true;
    return;
  },

  loadUserQuestions: function() {
    var params = {
      userId: app.currentUser.id
    };

    $.when(
      QuestionModel.findQuestionsByUserId(params)
    ).then(
      this.proxy( this.onLoadUserQuestionsDone ),
      this.proxy( this.onLoadUserQuestionsFail )
    );
  },

  onLoadUserQuestionsDone: function( response ) {
    console.log("In onLoadUserQuestionsDone. Response: ", response );
    response.imagePath = app.defaultImagePath;
    $(".stageContent").html( "askit_screens_qnGallery_question_gallery_view_v3", response );
    app.hideLoader();
    return;
  },

  onLoadUserQuestionsFail: function( response ) {
    console.error("In onLoadUserQuestionsFail. Response: ", response );
    return;
  },

  renderQuestionAnswerView: function() {
    if ( viewAnswerFlow.qnLoaded && viewAnswerFlow.ansLoaded ) {
      if( viewAnswerFlow.qnError || viewAnswerFlow.ansError ) {
        console.error("Error in rendering question.");
        return;
      }
      viewAnswerFlow.imagePath = app.defaultImagePath;
      $(".stageContent").html("askit_screens_qnGallery_question_answers_view_v3", viewAnswerFlow);
      app.hideLoader();
    }
    return;
  },

  recordApproval: function( ansId, rating ) {
    var params = {
      ansId: ansId,
      rating: rating
    };

    $.when(
      AnswerModel.rateAnswer( params )
    ).then(
      this.proxy( this.onRateAnswerDone ),
      this.proxy( this.onRateAnswerFail )
    );
  },

  onRateAnswerDone: function( response ) {
    console.log("In onRateAnswerDone. Response: ", response );
    this.showNextQuestion();
    return;
  },

  onRateAnswerFail: function( response ) {
    console.error("In onRateAnswerFail. Response: ", response);
    this.showNextQuestion();
    return;
  },

  showNextQuestion: function() {
    $("#your-qn-answer-" + this.currentAnswer ).addClass("hide");
    $("#your-qn-answer-approval-container-" + this.currentAnswer ).addClass("hide");
    this.currentAnswer++;
    if( this.currentAnswer == viewAnswerFlow.answers.length ) {
      $(".no-more-questions-container").removeClass("hide");
    }
    else {
      $("#your-qn-answer-" + this.currentAnswer ).removeClass("hide");
      $("#your-qn-answer-approval-container-" + this.currentAnswer ).removeClass("hide");
    }
    return;
  },

  ".view-answers-button click": function( el, ev ) {
    var buttonId  = $(el).attr( "id" ),
        qnId      = buttonId.substring(20);
    app.setLocation( "/yourQuestions?qnId=" + qnId );
  },

  ".toggle-qn click": function( el, ev ) {
    $(".toggle-qn").toggleClass("hide");
    $("#your-qn-content").toggleClass("hide");
    return;
  },

  ".approve-button click": function( el, ev ) {
    var containerId = $(el).parent().attr("id"),
        ansId = containerId.substring(24);

    console.log("Approve. ansId: ", ansId);
    this.recordApproval( ansId, "approve" );
  },

  ".disapprove-button click": function( el, ev ) {
    var containerId = $(el).parent().attr("id"),
        ansId = containerId.substring(24);
    console.log("Disapprove. ansId: ", ansId);
    this.recordApproval( ansId, "disapprove" );
  },

  ".your-qn-back-button click": function( el, ev ) {
    app.setLocation( "/yourQuestions" );
  },

  ".go_home click": function() {
    app.setLocation( "/dashboard" );
  },
});
window.routes["/yourQuestions"] = QuestionGallery;
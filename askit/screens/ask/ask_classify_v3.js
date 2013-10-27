/*******************************  ASK FLOW (STAGE 2/3)  *******************************

1.  This page lets the user classify his question under level, subject and topic.
2.  Level has to be selected first, afterwhich the subject would be dynamically
    loaded based on the subjects belonging to the level.
3.  Same for topics
4.  Submission would result in storing selections into workflow, and move on to 
    submission results screen.

// TODO: Handle back functionality -> Load content from workflow for editing.
************************************************************************************/

Screen.extend("AskClassify",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Now, Categorise The Question: " } );
    $(".mainMenu").collapse('hide'); // Hides dropdown nav

    if( typeof qnWorkflow != "undefined" ) {
      $(".stageContent").html( "askit_screens_ask_ask_classify_view_v3", {} );
      this.loadLevels();
    }
    else {
      console.log("User came into classify without permission.");
      app.setLocation("/dashboard");
      return;
    }
  },

  loadLevels: function() {
    $.when(
      QuestionModel.findLevels()
    ).then(
      this.proxy( this.onLoadLevelsDone ),
      this.proxy( this.onLoadLevelsFail )
    );
  },

  onLoadLevelsDone: function( response ) {
    app.hideLoader();
    $("#classify_level_dropdown").html("askit_screens_ask_classify_dropdown_template_v3", response );
    return;
  },

  onLoadLevelsFail: function( response ) {
    app.hideLoader();
    console.error( "In onLoadLevelsFail. Response is: ", response );
    return;
  },

  loadSubjects: function( level ) {
    var params = { level: level };
    $.when(
      QuestionModel.findSubjects( params )
    ).then(
      this.proxy( this.onLoadSubjectsDone ),
      this.proxy( this.onLoadSubjectsFail )
    );
  },

  onLoadSubjectsDone: function( response ) {
    $("#classify_subject_dropdown").html("askit_screens_ask_classify_dropdown_template_v3", response );
    return;
  },

  onLoadSubjectsFail: function( response ) {
    console.error( "In onLoadSubjectsFail. Response is : ", response );
    return;
  },

  loadTopics: function( subject ) {
    var level = qnWorkflow.level,
        params = {
          level: level,
          subject: subject
        };
    $.when(
      QuestionModel.findTopics( params )
    ).then(
      this.proxy( this.onLoadTopicsDone ),
      this.proxy( this.onLoadTopicsFail )
    );
  },

  onLoadTopicsDone: function( response ) {
    $("#classify_topic_dropdown").html("askit_screens_ask_classify_dropdown_template_v3", response );
    return;
  },

  onLoadTopicsFail: function( response ) {
    console.error( "In onLoadTopicsFail. Response is : ", response );
    return;
  },

  checkClassifyComplete: function() {
    var level = $("#classify_level_choice").html(),
        subject = $("#classify_subject_choice").html(),
        topic = $("#classify_topic_choice").html();

    if( level == "Level" || subject == "Subject" || topic == "Topic" ) {
      $("#ask_classify_submit").addClass("hide");
    }
    else {
      $("#ask_classify_submit").removeClass("hide");
    }
  },

  // When level is selected, user has to reselect subject and topic.
  "#classify_level_dropdown li click": function( el, ev ) {
    var level = el.find("a").html();
    qnWorkflow.level = level;
    $("#classify_level_choice").html(level);
    $("#classify_subject_choice").html("Subject");
    $("#classify_subject_dropdown").html("<li class='row'>Loading Subjects...</li>");
    $("#classify_topic_choice").html("Topic");
    $("#classify_topic_dropdown").html("<li class='row'>Please select a subject first.</li>");
    this.loadSubjects( level );
    this.checkClassifyComplete();
    return;
  },

  // When subject is selected, user has to reselect topic
  "#classify_subject_dropdown li click": function( el, ev ) {
    var subject = el.find("a").html();
    if( subject == "Please select a level first." ) return;
    qnWorkflow.subject = subject;
    $("#classify_subject_choice").html(subject);
    $("#classify_topic_choice").html("Topic");
    $("#classify_topic_dropdown").html("<li class='row'>Loading Subjects...</li>");
    this.loadTopics( subject );
    this.checkClassifyComplete();
    return;
  },

  "#classify_topic_dropdown li click": function( el, ev ) {
    var topic = el.find("a").html();
    if( topic == "Please select a subject first." ) return;
    qnWorkflow.topic = topic;
    $("#classify_topic_choice").html(topic);
    this.checkClassifyComplete();
    return;
  },

  ".ask_back click": function() {
    qnWorkflow.edit = true;
    app.setLocation( "/ask?method=" + qnWorkflow.method );
    return;
  },

  "#ask_classify_submit click": function() {
    app.setLocation("ask/submit");
    return;
  },
});
window.routes["/ask/classify"] = AskClassify;
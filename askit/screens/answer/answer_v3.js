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
      ansWorkflow.id  = qnId;
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
    console.log("In onLoadSingleQuestionDone. Response is : ", response);
    response.data.imagePath = app.defaultImagePath;
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
    response.imagePath = app.defaultImagePath;
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

  "#ans_upload_image click": function() {
    $("#uploadAnsImage").click();
  },

  ".toggle-qn click": function( el, ev ) {
    $(".toggle-qn").toggleClass("hide");
    $("#answer-qn-content").toggleClass("hide");
  },

  ".answer-submit click": function( el, ev ) {
    var answerTextContent = $("#answer_text_content").val();
        
    if( answerTextContent == "" ) {
      $("#answer-msg").html("Your answer cannot be empty!").removeClass("hide");
      return;
    }
    ansWorkflow.content = answerTextContent;
    ansWorkflow.author  = app.currentUser.id;
    this.submitAnswer();
  },

  submitAnswer: function() {
    $.when(
      AnswerModel.create( ansWorkflow )
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

  "#uploadAnsImage change": function( el, ev ) {
    // Read files
    var files = ev.target.files,
        file  = files[0];

    // Ensure file is an image
    if( file.type.match(/image.*/)) {
      // Load image
      var reader = new FileReader();
      reader.onload = function( readerEvent ) {
        var image = new Image();
        image.onload = function( imageEvent ) {
          // Resize image
          var canvas  = document.createElement('canvas'),
              maxSize = 1200,
              width   = image.width,
              height  = image.height;

          if( width > height && width > maxSize ) {
            height  *=  maxSize / width;
            width   =   maxSize;
          }
          else {
            width   *=  maxSize / height;
            height  =   maxSize;
          }
          canvas.width  = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage( image, 0, 0, width, height );

          // Upload image
          var xhr = new XMLHttpRequest();
          if( xhr.upload ) {
            // File uploaded / failed
            xhr.onreadystatechange = function( event ) {
              if( xhr.readyState == 4 ) {
                if( xhr.status == 200 ) {
                  // Assign image location to workflow
                  ansWorkflow.imageSrc = xhr.responseText;
                  console.log( "Image uploaded: " + xhr.responseText );
                  ev.target.value = "";
                  $("#ansImagePreviewContainer").empty();
                  $("#ansImagePreviewContainer").append( '<img class="img-standard" src="' + app.defaultImagePath + xhr.responseText + '" >' );
                }
                else {
                  console.error( "Image failed." );
                }
              }
            }

            // Commence upload
            xhr.open( 'post', 'server/process-upload.php', true );
            xhr.send( canvas.toDataURL('image/jpeg') );
          }
        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    }
  },
});
window.routes["/answer"] = Answer;
Screen.extend("QuestionGallery",
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html( "askit_screens_common_common_stage", { title: "Question Gallery" } );
		$(".stageContent").html( "askit_screens_qnGallery_qnGallery_view", {} );
		
		this.loadUserQuestions();
	},

	loadUserQuestions: function() {
		var params = {
			userId: app.currentUser.id
		};

		$.when(
			QuestionModel.findAllByUserId(params)
		).then(
			this.proxy( this.onLoadUserQuestionsDone ),
			this.proxy( this.onLoadUserQuestionsFail )
		);
	},

	onLoadUserQuestionsDone: function(response) {
		console.log("In onLoadUserQuestionsDone. Response : ", response);
	
		if(response.data.length === 0) {
			$("#qgQnEmpty").removeClass("hidden");
		}
		else {
			$("#qgQnContainer tbody").html("askit_screens_qnGallery_qnGallery_question_item_view", response.data);
			$("#qgQnContainer table").removeClass("hidden");
		}

		$("#qgQnLoadingContainer").addClass("hidden");
	},

	onLoadUserQuestionsFail: function(response) {
		console.error("In onLoadUserQuestionsFail. Response : ", response);
	},
});
window.routes["/questionGallery"] = QuestionGallery;
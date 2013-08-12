Screen.extend("ViewAnswers", 
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage(); 		//screens.js
		this.element.html("askit_screens_common_common_stage", {title: "View Answer"});
		$(".stageContent").html( "askit_screens_viewAnswer_viewAnswer_view", {} );
		
		this.loadQuestion( this.options.route.params);
		this.loadAnswers( this.options.route.params );
	},

	loadQuestion: function(params) {
		console.log("Loading question", params);

		$.when(
			QuestionModel.findQuestionById(params)
		).then(
			this.proxy( this.onLoadQnDone ),
			this.proxy( this.onLoadQnFail )
		);
	},

	onLoadQnDone: function(response) {
		$("#vaQnContent").html( "askit_screens_viewAnswer_viewAnswer_question_view", response.data );
		return;
	},

	onLoadQnFail: function(response) {
		console.log("onLoadQnFail. Response is : ", response);
	},

	loadAnswers: function( params ) {
		console.log("Loading answers", params);

		$.when(
			AnswerModel.findAllByQuestionId(params)
		).then(
			this.proxy( this.onLoadQnAnswersDone ),
			this.proxy( this.onLoadQnAnswersFail )
		);
	},

	onLoadQnAnswersDone: function(response) {
		console.log("onLoadQnAnswersDone. Response is : ", response);
		$("#vaAnsList").html("askit_screens_viewAnswer_viewAnswer_answer_view", response.data);
		$("#vaAnsCarousel").carousel();
		$("#vaContainer").removeClass("hidden");
		return;
	},

	onLoadQnAnswersFail: function(response) {
		console.log("onLoadQnAnswersFail. Response is : ", response);
	},

});
window.routes["/viewAnswers"] = ViewAnswers;
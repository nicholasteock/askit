Screen.extend("YourAnswers",
{
	init: function( el, options ) {
		this.className = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html("askit_screens_common_common_stage", {title: "Your Answer"});
		$(".stageContent").html( "askit_screens_yourAnswer_yourAnswer_view", {} );
		this.loadQuestion( this.options.route.params );
		this.loadAnswer( this.options.route.params );
	},

	loadQuestion: function( params ) {
		console.log("Loading question", params);

		params.userId = app.currentUser.id;

		$.when(
			QuestionModel.findQuestionByAnsId(params)
		).then(
			this.proxy( this.onLoadQnDone ),
			this.proxy( this.onLoadQnFail )
		);
	},

	onLoadQnDone: function( response ) {
		console.log("In onLoadQnDone. Response is : ", response);

		$("#yaQnLoading").addClass("hidden");
		$("#yaQnContent").html( "askit_screens_yourAnswer_yourAnswer_question_view", response ).removeClass("hidden");
		return;
	},

	onLoadQnFail: function( response ) {
		console.log("In onLoadQnFail. Response is : ", response);
		return;
	},

	loadAnswer: function( params ) {
		console.log("Loading answer.", params);

		params.userId = app.currentUser.id;

		$.when(
			AnswerModel.findAnswerById(params)
		).then(
			this.proxy( this.onLoadAnsDone ),
			this.proxy( this.onLoadAnsFail )
		);
	},

	onLoadAnsDone: function( response ) {
		console.log("In onLoadAnsDone. Response is : ", response);
		$("#yaAnsLoading").addClass("hidden");
		$("#yaStatsLoading").addClass("hidden");
		$("#yaAnsContent").html( "askit_screens_yourAnswer_yourAnswer_answer_view", response ).removeClass("hidden");
		$("#yaStatsContent").html( "askit_screens_yourAnswer_yourAnswer_stats_view", response ).removeClass("hidden");
		return;
	},

	onLoadAnsFail: function( response ) {
		console.log("In onLoadQnFail. Response is : ", response);
		return;
	},
});
window.routes["/yourAnswer"] = YourAnswers;
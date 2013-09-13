Screen.extend("Statistics",
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiScreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html( "askit_screens_common_common_stage", { title: "Your Statistics" } );
		$(".stageContent").html( "askit_screens_statistics_statistics_view", {} );
	
		this.loadUserQuestions();
		this.loadUserAnswers();
	},

	loadUserQuestions: function() {
		var params = {
			userId: app.currentUser.id
		};

		$.when(
			QuestionModel.findAllByUserId( params )
		).then(
			this.proxy( this.onLoadUserQuestionsDone ),
			this.proxy( this.onLoadUserQuestionsFail )
		);
	},

	onLoadUserQuestionsDone: function( response ) {
		console.log("In onLoadUserQuestionsDone. Response : ", response);

		$("#stQnStatistics").html( "askit_screens_statistics_statistics_qn_statistics_view", response ).removeClass("hidden");
		$("#stQnLoading").addClass("hidden");
		return;
	},

	// TODO : Erro handling here.
	onLoadUserQuestionsFail: function( response ) {
		console.error("In onLoadUserQuestionsFail. Response : ", response);
		return;
	},

	loadUserAnswers: function() {
		var params = {
			userId: app.currentUser.id
		};

		$.when(
			AnswerModel.findAllByUserId( params )
		).then(
			this.proxy( this.onLoadUserAnswersDone ),
			this.proxy( this.onLoadUserAnswersFail )
		);
	},

	onLoadUserAnswersDone: function( response ) {
		console.log("In onLoadUserAnswersDone. Response : ", response);

		$("#stAnsStatistics").html( "askit_screens_statistics_statistics_ans_statistics_view", response ).removeClass("hidden");
		$("#stAnsLoading").addClass("hidden");
		return;
	},

	// TODO: Error handling view here.
	onLoadUserAnswersFail: function( response ) {
		console.error("In onLoadUserAnswersFail. Response : ", response);
		return;
	},
});
window.routes["/yourStatistics"] = Statistics;
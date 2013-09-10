Screen.extend("ViewAnswers", 
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage(); 		//screens.js
		this.element.html("askit_screens_common_common_stage", {title: "View Answer"});
		$(".stageContent").html( "askit_screens_viewAnswer_viewAnswer_view", {} );

		this.loadQuestion( this.options.route.params );
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
		$("#vaQnLoading").addClass("hidden");
		$("#vaQnContent").html( "askit_screens_viewAnswer_viewAnswer_question_view", response.data ).removeClass("hidden");
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
		$("#vaAnsLoading").addClass("hidden");
		$("#vaAnsContent").html("askit_screens_viewAnswer_viewAnswer_answer_view", response.data).removeClass("hidden");
		$("#vaAnsCarousel").carousel({
										interval 	: false,
										wrap		: false
									});
		return;
	},

	onLoadQnAnswersFail: function(response) {
		console.log("onLoadQnAnswersFail. Response is : ", response);
	},

	".vaQnApprove mouseover": function( el, ev ) {
		$(el).html("EUREKA!");
	},

	".vaQnDisapprove mouseover": function( el, ev ) {
		$(el).html("Not Helpful...");
	},

	".vaQnApprove mouseleave": function( el, ev ) {
		$(el).html('<i class="icon-thumbs-up"></i>');
	},

	".vaQnDisapprove mouseleave": function( el, ev ) {
		$(el).html('<i class="icon-thumbs-down"></i>');
	},

	".vaQnApprove click": function( el, ev ) {
		var ansId 	= 	$(el).parent().attr("id"),
			params 	= 	{
							ansId 	: ansId,
							rating 	: "approve"
						};

		$("#vaAnsCarousel").slideUp();

		$.when(
			AnswerModel.rateAnswer( params )
		).then(
			this.proxy( this.onRateQnDone ),
			this.proxy( this.onRateQnFail )
		);
	},

	".vaQnDisapprove click": function( el, ev ) {
		var ansId 	= 	$(el).parent().attr("id"),
			params 	= 	{
							ansId 	: ansId,
							rating 	: "disapprove"
						};

		$("#vaAnsCarousel").slideUp();

		$.when(
			AnswerModel.rateAnswer( params )
		).then(
			this.proxy( this.onRateQnDone ),
			this.proxy( this.onRateQnFail )
		);
	},

	onRateQnDone: function( response ) {
		console.log( "In onRateQnDone. Response is : ", response );
		$("#vaAnsCarousel").carousel("next");
		$("#vaAnsCarousel").delay(600).slideDown();
		return;
	},

	onRateQnFail: function( response ) {
		console.log( "In onRateQnFail. Response is : ", response );
		return;
	},

});
window.routes["/viewAnswers"] = ViewAnswers;
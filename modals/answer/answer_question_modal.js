Modal.extend("AnswerQuestionModal",
{
	setup: function(options) {
		if( !options ) {
			options = {};
		}
		$.extend( options, { customCssClass: "", animate: true } );
		this.template = "modals_answer_answer_question_modal_view";
		this._super( "modal" + this.Class.shortName, options );
	},

	"#answerSubmit click":function( el, ev ) {
		var refAnswerContainer = $(".modalAnsContainer"),
			params = {
						id		: refAnswerContainer.attr("id"),
						content	: refAnswerContainer.find(".answerContent").val(),
						author	: app.currentUser.id
					};
		$.when(
			AnswerModel.create( params )
		).then(
			this.proxy( this.onSubmitAnswerDone ),
			this.proxy( this.onSubmitAnswerFail )
		);
	},
	
	onSubmitAnswerDone: function( response ) {
		if( response.result !== "success" ) {
			this.onSubmitAnswerFail( response );
			return;
		}
		$(".modalQnContainer").addClass("hidden");
		$(".modalAnsContainer").addClass("hidden");
		$("#modalClose").removeClass("hidden");
		$("#modalCancel").addClass("hidden");
		$("#answerSubmit").addClass("hidden");
		$("#answerSubmitSuccess").removeClass("hidden");
	},
	
	onSubmitAnswerFail: function( response ) {
		console.log("onSubmitAnswerFail", response);
		$(".modalQnContainer").addClass("hidden");
		$(".modalAnsContainer").addClass("hidden");
		$("#answerSubmitFail").removeClass("hidden");
		$("#modalClose").removeClass("hidden");
		$("#modalCancel").addClass("hidden");
		$("#answerSubmit").addClass("hidden");
	},
	
});

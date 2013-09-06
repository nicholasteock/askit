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

	"#submitAnsBtn click": function( el, ev ) {
		var ansContent 	= 	$("#modalAnsContent").val(),
			qnId 		= 	$("#modalAnsContent").parent().attr("id"),
			params 		= 	{
								id 		: qnId,
								content : ansContent,
								author	: app.currentUser.id
							};
		if( ansContent == "" ) {
			$("#ansSubmitErrMsg").html("Your answer is empty!");
			return;
		}
		else {
			$("#ansSubmitErrMsg").html("");
			$.when(
				AnswerModel.create( params )
			).then(
				this.proxy( this.onSubmitAnsDone ),
				this.proxy( this.onSubmitAnsFail )
			);
		}
	},

	onSubmitAnsDone: function( response ) {
		$("#ansModal").find(".modal-title").html("Thank you!");
		$("#ansModal").find(".modal-body").html("Your answer has been submitted!");
		$("#submitAnsBtn").addClass("hidden");
		return;
	},

	onSubmitAnsFail: function( response ) {
		$("#ansModal").find(".modal-title").html("Oops!");
		$("#ansModal").find(".modal-body").html("Something went wrong during submission. Please try again later.");
		$("#submitAnsBtn").addClass("hidden");
		return;
	},
});

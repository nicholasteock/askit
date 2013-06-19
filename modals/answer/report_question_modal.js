Modal.extend("ReportQuestionModal",
{
	setup: function(options) {
		if( !options ) {
			options = {};
		}
		$.extend( options, { customCssClass: "", animate: true } );
		this.template = "modals_answer_report_question_modal_view";
		this._super( "modal" + this.Class.shortName, options );
	},

	"#reportSubmit click": function( el, ev ) {
		console.log("TODO: Send email of report.");
		this.onSendReportDone({result:"success"});
	},
	
	onSendReportDone: function( response ) {
		if( response.result !== "success" ) {
			this.onSendReportFail( response );
			return;
		}
		$(".modalQnContainer").addClass("hidden");
		$(".modalReportContainer").addClass("hidden");
		$("#reportSubmitSuccess").removeClass("hidden");
		$("#modalClose").removeClass("hidden");
		$("#modalCancel").addClass("hidden");
		$("#reportSubmit").addClass("hidden");
	},
	
	onSendReportFail: function( response ) {
		$(".modalQnContainer").addClass("hidden");
		$(".modalReportContainer").addClass("hidden");
		$("#reportSubmitFail").removeClass("hidden");
		$("#modalClose").removeClass("hidden");
		$("#modalCancel").addClass("hidden");
		$("#reportSubmit").addClass("hidden");
	},
});

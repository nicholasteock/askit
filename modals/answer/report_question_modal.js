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

	"#submitReportBtn click": function( el, ev ) {
		console.log("TODO: Send email of report.");
		this.onSendReportDone({result:"success"});
	},
	
	onSendReportDone: function( response ) {
		$("#reportModal").find(".modal-title").html("Report Submitted!");
		$("#reportModal").find(".modal-body").html("Thank you for helping to improve our community!");
		$("#submitReportBtn").addClass("hidden");
		return;
	},
	
	onSendReportFail: function( response ) {
		$("#reportModal").find(".modal-title").html("Oops!");
		$("#reportModal").find(".modal-body").html("Something went wrong during submission. Please try again later.");
		$("#submitReportBtn").addClass("hidden");
		return;
	},
});
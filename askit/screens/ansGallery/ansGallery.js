Screen.extend("AnsGallery",
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html( "askit_screens_common_common_stage", { title: "Your Answers" } );
		$(".stageContent").html( "askit_screens_ansGallery_ansGallery_view", {} );
	
		this.loadUserAnswers();
	},

	loadUserAnswers: function() {
		var params = {
			userId: app.currentUser.id
		};

		$.when(
			AnswerModel.findAllByUserId(params)
		).then(
			this.proxy( this.onLoadUserAnswersDone ),
			this.proxy( this.onLoadUserAnswersFail )
		);
	},

	onLoadUserAnswersDone: function( response ) {
		console.log("In onLoadUserAnswersDone. Response : ", response );

		if( response.length === 0 ) {
			$("agAnsEmpty").removeClass("hidden");
		}
		else {
			$("#agAnsContainer tbody").html("askit_screens_ansGallery_ansGallery_answer_item_view", response);
			$("#agAnsContainer table").removeClass("hidden");
		}

		$("#agAnsLoadingContainer").addClass("hidden");
		return;
	},

	onLoadUserAnswersFail: function( response ) {
		console.error("In onLoadUserAnswersFail. Response : ", response);
		return;
	},

	"#agAnsContainer tr hover": function( el, ev ) {
		if( $(el).hasClass("positiveRating") ) {
			$(el).addClass("positiveHover");
		}
		else {
			$(el).addClass("negativeHover");
		}
	},

	"#agAnsContainer tr mouseleave": function( el, ev ) {
		$("#agAnsContainer tr").removeClass("positiveHover negativeHover");
	},

	"#agAnsContainer tr click": function(el, ev) {
		var ansId = el.attr("id");
		app.setLocation( "/yourAnswer?ansId=" + ansId );
	},
});
window.routes["/yourAnswers"] = AnsGallery;
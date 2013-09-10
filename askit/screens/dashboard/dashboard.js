Screen.extend("Dashboard",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html( "askit_screens_common_common_stage", { title: "Welcome back " + app.currentUser.firstLastName() + "!"} );
		$(".stageContent").html( "askit_screens_dashboard_dashboard_view", {} );

		this.loadUserQuestions();
		this.loadUserAnswers();
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

	onLoadUserQuestionsDone: function( response ) {
		console.log("In onLoadUserQuestionsDone. Response is: ", response.data);

		if(response.data.length === 0) {
			$("#dbQnEmpty").removeClass("hidden");
		}
		else {
			$("#dbQnContainer tbody").html("askit_screens_dashboard_dashboard_question_item_view", response.data);
			$("#dbQnContainer table").removeClass("hidden");
		}
	
		$("#dbQnLoadingContainer").addClass("hidden");
	},

	onLoadUserQuestionsFail: function(response) {
		console.error("In onLoadUserQuestionsFail. Response is: ", response.data);
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

	onLoadUserAnswersDone: function(response) {
		console.log("In onLoadUserAnswersDone. Response is: ", response.data);
	
		if(response.data.length === 0) {
			$("#dbAnsEmpty").removeClass("hidden");
		}
		else {
			$("#dbAnsContainer tbody").html("askit_screens_dashboard_dashboard_answer_item_view", response.data);
			$("#dbAnsContainer table").removeClass("hidden");
		}

		$("#dbAnsLoadingContainer").addClass("hidden");
	},

	onLoadUserAnswersFail: function(response) {
		console.error("In onLoadUserAnswersFail. Response is: ", response.data);
	},

	"#dbQnContainer tr click": function(el, ev) {
		var qnId = el.attr("id");
		app.setLocation( "/viewAnswers?qnId=" + qnId );
	},

	"#dbAnsContainer tr hover": function( el, ev ) {
		if( $(el).hasClass("positiveRating") ) {
			$(el).addClass("positiveHover");
		}
		else {
			$(el).addClass("negativeHover");
		}
	},

	"#dbAnsContainer tr mouseleave": function( el, ev ) {
		$("#dbAnsContainer tr").removeClass("positiveHover negativeHover");
	},

	"#dbAnsContainer tr click": function(el, ev) {
		console.log("clicked", el.attr("id"));
	},
});
window.routes["/"] = Dashboard;
window.routes["/dashboard"] = Dashboard;

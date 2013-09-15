// TODO : Create user object.
// TODO : Pin functionality.
// TODO : Report functionality.
// TODO : Filter questions functionality.
// TODO : Modal template.

Screen.extend("Answer",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html("askit_screens_common_common_stage", { title: "Questions List" });
		$(".stageContent").html("askit_screens_answer_answer_view", {});
		this.qnListContainer = $("#qnItemsContainer");
		this.filters = 	{
							level 	: "",
							subject : "",
							topic 	: ""
						};

		this.loadQuestions();
		this.loadFilters();
	},

	loadFilters: function() {
		console.log("loadFilters");

		$.when(
			QuestionModel.findAllFilters()
		).then(
			this.proxy( this.onFindAllFiltersDone ),
			this.proxy( this.onFindAllFiltersFail )
		);
	},

	onFindAllFiltersDone: function( response ) {
		console.log("onFindAllFiltersDone. Response : ", response);

		$("#qnFiltersContainer").html( "askit_screens_answer_answer_filter_dropdown_view", response);
		return;
	},

	onFindAllFiltersFail: function( response ) {
		console.error("onFindAllFiltersFail. Response : ", response);
		return;
	},

	filterQuestions: function( params ) {
		console.log("filterQuestions.");

		$.when(
			QuestionModel.findAllByFilters( params )
		).then(
			this.proxy( this.onLoadQuestionsDone ),
			this.proxy( this.onLoadQuestionsFail )
		);
		return;
	},
	
	// Retrieves all questions except for the ones belonging to the user.
	// No point user answering his own questions
	loadQuestions: function(){
		$.when(
			QuestionModel.findAll()
		).then(
			this.proxy( this.onLoadQuestionsDone ),
			this.proxy( this.onLoadQuestionsFail )
		);
	},
	
	onLoadQuestionsDone: function( response ) {
		console.log("onLoadQuestionDone ", response);

		// Filters out the user's own questions.
		var questions = _.reject( response.questions, { author: app.currentUser.id } );

		if( questions.length === 0 ) {
			this.qnListContainer.html( "askit_screens_answer_no_qn_view", {} );
		}
		else {
			// Render list of questions view here
			this.qnListContainer.html( "askit_screens_answer_answer_qn_item_view", questions );
			$(".qnItemFooterAnswer").tooltip({
												animation	: true,
												placement	: "bottom",
												title		: "Click to answer the question",
												trigger		: "hover"
											});
			$(".qnItemFooterPin").tooltip({
												animation	: true,
												placement	: "bottom",
												title		: "If this is similar to a question you have, click here to pin it.",
												trigger		: "hover"
											});
			$(".qnItemFooterReport").tooltip({
												animation	: true,
												placement	: "bottom",
												title		: "Click here to report abusive/inappropriate content",
												trigger		: "hover"
											});
		}
	},
	
	onLoadQuestionsFail: function( response ) {
		console.log("onLoadQuestionFail ", response);
		return;
	},
	
	".qnItemFooterAnswer click": function( el, ev ) {
		var refContainer = el.closest(".qnItem"),
			qnIndex = refContainer.attr("id");
			qnText	= refContainer.find(".qnText").text();
		var m = new AnswerQuestionModal( { data: { id: qnIndex, content: qnText } } );
		m.show();
		return;
	},
	
	".qnItemFooterPin click": function() {
		console.log("TODO: Pin Question function");
		return;
	},
	
	".qnItemFooterReport click": function( el, ev ) {
		var refContainer = el.closest(".qnItem"),
			qnIndex = refContainer.attr("id");
			qnText	= refContainer.find(".qnText").text();
		var m = new ReportQuestionModal( { data: { id: qnIndex, content: qnText } } );
		m.show();
		return;
	},

	".ansDropdown li click": function( el, ev ) {
		var ddElement 	= $(el).parent(),
			ddContainer = ddElement.parent(),
			ddName 		= ddElement.attr("id"),
			ddOption 	= el.text(); 

		ddContainer.find("button").html(ddOption);

		var level 	= $("#levelFilterContainer").find("button").text(),
			subject	= $("#subjectFilterContainer").find("button").text(),
			topic	= $("#topicFilterContainer").find("button").text(),
			params 	= {
						level 	: level === "All Levels" ? "All" : level,
						subject : subject === "All Subjects" ? "All" : subject,
						topic 	: topic === "All Topics" ? "All" : topic
			};

		this.filterQuestions( params );
		return;
	}
});
window.routes["/answer"] = Answer;

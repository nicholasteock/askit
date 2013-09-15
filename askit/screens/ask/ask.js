Screen.extend("Ask",
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html( "askit_screens_common_common_stage", { title: "Ask Your Question!" } );
		$(".stageContent").html( "askit_screens_ask_ask_view", {} );
		this.levelContainer 	= $("#levelSelectContainer");
		this.subjectContainer 	= $("#subjectSelectContainer");
		this.topicContainer 	= $("#topicSelectContainer");
		this.qnContent 			= $("#qnContent");
		this.submitQnBtn 		= $("#submitQnBtn");
		this.qnSubmitErr 		= $("#qnSubmitErrMsg");
		this.loadLevels();
	},

	loadLevels: function() {
		$.when(
			QuestionModel.findLevels()
		).then(
			this.proxy( this.onLoadLevelsDone ),
			this.proxy( this.onLoadLevelsFail )
		);
	},

	onLoadLevelsDone: function( response ) {
		this.levelContainer.find("#levelDropdown").html( "askit_screens_ask_ask_filter_dropdown_view", response );
		return;
	},

	onLoadLevelsFail: function( response ) {
		console.error( "In onLoadLevelsFail. Response is : ", response );
		return;
	},

	loadSubjects: function( level ) {
		var params = { level: level };
		
		$.when(
			QuestionModel.findSubjects( params )
		).then(
			this.proxy( this.onLoadSubjectsDone ),
			this.proxy( this.onLoadSubjectsFail )
		);
	},

	onLoadSubjectsDone: function( response ) {
		this.subjectContainer.find("#subjectDropdown").html( "askit_screens_ask_ask_filter_dropdown_view", response );
		return;
	},

	onLoadSubjectsFail: function( response ) {
		console.error( "In onLoadSubjectsFail. Response is : ", response );
		return;
	},

	loadTopics: function( subject ) {
		var level 	= 	this.levelContainer.find("button").text(),
			params 	= 	{ 
							level 	: level,
							subject : subject
						};

		$.when(
			QuestionModel.findTopics( params )
		).then(
			this.proxy( this.onLoadTopicsDone ),
			this.proxy( this.onLoadTopicsFail )
		);
	},

	onLoadTopicsDone: function( response ) {
		this.topicContainer.find("#topicDropdown").html( "askit_screens_ask_ask_filter_dropdown_view", response );
		return;
	},

	onLoadTopicsFail: function( response ) {
		console.error( "In onLoadTopicsFail. Response is : ", response );
		return;
	},

	submitQuestion: function( params ) {
		$.when(
			QuestionModel.create( params )
		).then(
			this.proxy( this.onSubmitQnDone ),
			this.proxy( this.onSubmitQnFail )
		);
	},

	onSubmitQnDone: function( response ) {
		this.submitQnBtn.html( "Done!" );
		this.resetInput();
		return;
	},

	onSubmitQnFail: function( response ) {
		console.error( "In onSubmitQnFail. Response is : ", response );
		this.submitQnBtn.html("Ask!").removeClass("disabled");
		this.qnSubmitErr.html( "Error in submission. Please try again." );
		return;
	},

	resetInput: function() {
		this.levelContainer.find("button").html("Select Level").removeClass("selectionMade");
		this.subjectContainer.find("button").html("Select Subject").addClass("disabled").removeClass("selectionMade");
		this.topicContainer.find("button").html("Select Topic").addClass("disabled").removeClass("selectionMade");
		this.qnContent.val("");
	},

	verifyQn: function( params ) {
		var validQn = false;

		if( params.level === "Select Level" ) {
			this.qnSubmitErr.html( "Oops! You forgot to select a level!" );
		}
		else if( params.subject === "Select Subject" ) {
			this.qnSubmitErr.html( "Hmm, what is the subject?" );
		}
		else if( params.topic === "Select Topic" ) {
			this.qnSubmitErr.html( "Did you leave out the topic?" );
		}
		else if( params.content === "" ) {
			this.qnSubmitErr.html( "Seems like your question is empty!" );
		}
		else {
			validQn = true;
		}

		return validQn;
	},

	".dropdown-menu li click": function( el, ev ) {
		var ddElement 	= $(el).parent(),
			ddContainer = ddElement.parent(),
			ddName 		= ddElement.attr("id"),
			ddOption	= el.text();

		this.submitQnBtn.html("Ask!").removeClass("disabled");
		ddContainer.find("button").html(ddOption).addClass("selectionMade");
		
		if( ddName === "levelDropdown" ) {
			this.subjectContainer.find("button").html("Select Subject").removeClass("disabled").removeClass("selectionMade");
			this.topicContainer.find("button").html("Select Topic").addClass("disabled").removeClass("selectionMade");
			this.loadSubjects( ddOption );
		}

		if( ddName === "subjectDropdown" ) {
			this.topicContainer.find("button").html("Select Topic").removeClass("disabled").removeClass("selectionMade");
			this.loadTopics( ddOption );
		}
	},

	"#submitQnBtn click": function() {
		var	level 	= 	this.levelContainer.find("button").text(),
			subject = 	this.subjectContainer.find("button").text(),
			topic 	= 	this.topicContainer.find("button").text(),
			content = 	$("#qnContent").val(),
			author 	= 	app.currentUser.id,
			params 	= 	{
							level 	: level,
							subject : subject,
							topic 	: topic,
							content : content,
							author 	: author
						};

		this.qnSubmitErr.html("");

		if( this.verifyQn( params ) ) {
			this.submitQnBtn.html("Submitting...").addClass("disabled");
			this.submitQuestion( params );
		}
	},
});
window.routes["/ask"] = Ask;
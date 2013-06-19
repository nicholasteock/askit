Screen.extend("Ask",
{
	init: function( el, options ){
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();		//screens.js
		this.element.html( "askit_screens_common_common_stage", { title: "Ask Your Question!" } );
		$(".stageContent").html( "askit_screens_ask_ask_view", {} );
		this.levelDropdown = $("#qnLevelDropdown");
		this.subjectDropdown = $("#qnSubjectDropdown");
		this.topicDropdown = $("#qnTopicDropdown");
		this.loadingSpinner = $("#loadingSpinner");
	},
	
	"#qnLevel click": function( el, ev ) {
		ev.stopPropagation();
		$(".btn-group").removeClass("open");
		el.closest(".btn-group").addClass("open");
	},
	
	"#qnSubject click": function( el, ev ) {
		ev.stopPropagation();
		$(".btn-group").removeClass("open");
		el.closest(".btn-group").addClass("open");
	},
	
	"#qnTopic click": function( el, ev ) {
		ev.stopPropagation();
		$(".btn-group").removeClass("open");
		el.closest(".btn-group").addClass("open");
	},
	
	"#qnLevelDropdown a click": function( el, ev ) {
		el.closest(".btn-group").addClass("open");
		this.subjectDropdown.empty();
		this.topicDropdown.empty();
		var levelSelected = el.text(),
			params = { level: levelSelected };
		$("#qnLevel").text( levelSelected );
		$.when(
			QuestionModel.findSubjects( params )
		).then(
			this.proxy( this.onFindSubjectsDone ),
			this.proxy( this.onFindSubjectsFail )
		);
	},
	
	onFindSubjectsDone: function( response ) {
		//~ console.log("onFindSubjectsDone. Response: ", response);
		if( !response.result === "success" ) {
			this.onFindSubjectsFail(response);
			return;
		}
		this.subjectDropdown.html("askit_screens_ask_subject_list_view", response.data);
	},
	
	onFindSubjectsFail: function( response ) {
		console.log("onFindSubjectsFail. Response:  ", response);
	},
	
	"#qnSubjectDropdown a click": function( el, ev ) {
		this.topicDropdown.empty();
		var levelSelected	= $("#qnLevel").text(),
			subjectSelected = el.text(),
			params			= { level: levelSelected, subject: subjectSelected };
		
		$("#qnSubject").text( subjectSelected );
		$.when(
			QuestionModel.findTopics( params )
		).then(
			this.proxy( this.onFindTopicsDone ),
			this.proxy( this.onFindTopicsFail )
		);
	},
	
	onFindTopicsDone: function( response ) {
		//~ console.log("onFindTopicsDone. Response: ", response);
		if( !response.result === "success" ) {
			this.onFindTopicsFail(response);
			return;
		}
		this.topicDropdown.html("askit_screens_ask_topic_list_view", response.data);
	},
	
	onFindTopicsFail: function( response ) {
		console.log("onFindTopicsFail. Response:  ", response);
	},
	
	"#qnTopicDropdown a click": function( el, ev ) {
		//~ console.log("Topic clicked.", el.text());
		$("#qnTopic").text(el.text());
	},
	
	"#qnSubmit click": function(){
		$(".qnMsg").addClass("hidden");
		
		var level	= $("#qnLevel").text(),
			subject	= $("#qnSubject").text(),
			topic 	= $("#qnTopic").text(),
			content = $("#qnContent").val();
		
		if( !level ) {
			$("#noLevelErrorMsg").removeClass("hidden");
			return;
		}
		else if( !subject ) {
			$("#noSubjectErrorMsg").removeClass("hidden");
			return;
		}
		else if( !topic ) {
			$("#noTopicErrorMsg").removeClass("hidden");
			return;
		}
		else if( !content ) {
			$("#noContentErrorMsg").removeClass("hidden");
			return;
		}
		else {
			this.loadingSpinner.removeClass("hidden");
			$("#qnSubmit").addClass("disabled");
			$("#qnSubmit").attr("disabled", "disabled");
		
			var params	= { 
							level: level,
							subject: subject,
							topic: topic,
							content: content 
						};
						
			$.when(
				QuestionModel.create( params )
			).then(
				this.proxy( this.onSubmitQnDone ),
				this.proxy( this.onSubmitQnFail )
			);
		}
	},
	
	onSubmitQnDone: function( response ) {
		//~ console.log("onSubmitQnDone. Response: ", response);
		this.loadingSpinner.addClass("hidden");
		$("#qnSubmit").removeClass("disabled");
		$("#qnSubmit").attr("disabled", null);
		if( !response.result === "success" ) {
			this.onSubmitQnFail(response);
			return;
		}
		
		$("#qnLevel").text("");
		$("#qnSubject").text("");
		$("#qnTopic").text("");
		$("#qnContent").val("");
		$("#qnSubmitSuccessMsg").removeClass("hidden");
		
	},
	
	onSubmitQnFail: function( response ) {
		this.loadingSpinner.addClass("hidden");
		$("#qnSubmit").removeClass("disabled");
		$("#qnSubmit").attr("disabled", null);
		console.log("onSubmitQnFail. Response:  ", response);
		$("#qnSubmitFailMsg").removeClass("hidden");
	},
});
window.routes["/ask"] = Ask;


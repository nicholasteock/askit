(function( window, $, undefined ) {

$.Model("QuestionModel",
{
	init: function() {
	},
	
	findAll: function() {
		console.log("Question.findAll");
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			return dfdResult.resolve( response );
		};
		
		var onError = function( response ) {
			return dfdResult.reject( response );
		};
		
		$.ajax({
				url			: "server/getQuestionsList.php",
				type		: "POST",
				dataType	: "json",
				success		: onSuccess,
				error		: onError
		});
		
		return dfdResult;
	},
	
	//returns JSON of subjects relevant to that level.
	findSubjects: function( params, success, error ) {
		console.log("findSubjectsByLevel. Level is : ", params);
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			return dfdResult.resolve( response );
		};
		
		var onError = function( response ) {
			return dfdResult.reject( response );
		};
		
		$.ajax({
				url			: "server/findSubjects.php",
				type		: "POST",
				data		: params,
				dataType	: "json",
				success		: onSuccess,
				error		: onError
		});
		
		return dfdResult;
	},
	
	//returns JSON of topics relevant to that subject and level.
	findTopics: function( params ) {
		console.log("findTopicsBySubject. Subject is : ", params);
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			return dfdResult.resolve( response );
		};
		
		var onError = function( response ) {
			return dfdResult.reject( response );
		};
		
		$.ajax({
				url			: "server/findTopics.php",
				type		: "POST",
				data		: params,
				dataType	: "json",
				success		: onSuccess,
				error		: onError
		});
		
		return dfdResult;
	},
	
	create: function( params ){
		console.log("submitQuestion. Content is : ", params);
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			return dfdResult.resolve( response );
		};
		
		var onError = function( response ) {
			return dfdResult.reject( response );
		};
		
		$.ajax({
				url			: "server/submitQuestion.php",
				type		: "POST",
				data		: params,
				dataType	: "json",
				success		: onSuccess,
				error		: onError
		});
		
		return dfdResult;
	},
},{});



})(window, $);

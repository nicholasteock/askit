(function( window, $, undefined ) {

$.Model("QuestionModel",
{
	init: function() {
	},
	
	findAll: function() {
		console.log("Question.findAll");
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
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

	// returns JSON of levels. Currently all levels are retrieved
	findLevels: function( params ) {
		console.log("findLevels. No params");

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve(response.data);
			}
			else {
				return onError(response);
			}
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findLevels.php",
				type 		: "POST",
				// data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},
	
	//returns JSON of subjects relevant to that level.
	findSubjects: function( params ) {
		console.log("findSubjectsByLevel. Level is : ", params);
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
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
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
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

	findAllFilters: function( params ) {
		console.log("findFilters");

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject( response );
		};

		$.ajax({
				url 		: "server/findFilters.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findAllByFilters: function(params) {
		console.log("findAllByFilters. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject( response );
		};

		$.ajax({
				url 		: "server/findQuestionsByFilters.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findAllByUserId: function(params) {
		console.log("findQuestionsByUser. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findQuestionsByUser.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findQuestionsByUserId: function(params) {
		console.log("findQuestionsByUserId. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findQuestionsByUserId.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findQuestionByAnsId: function(params) {
		console.log("findQuestionByAnsId. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve(response.data);
			}
			else {
				return onError(response);
			}
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findQuestionByAnsId.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findQuestionById: function(params) {
		console.log("findQuestionById. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve(response);
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findQuestionById.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},
	
	create: function( params ){
		console.log("submitQuestion. Content is : ", params);
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response );
			}
			else {
				return dfdResult.reject( response );
			}
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

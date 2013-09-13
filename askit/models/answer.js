(function( window, $, undefined ) {

$.Model("AnswerModel",
{
	init: function() {
	},
	
	findAll: function(params) {
		console.log("Answer.findAll");
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			return dfdResult.resolve( response );
		};
		
		var onError = function( response ) {
			return dfdResult.reject( response );
		};
		
		$.ajax({
				url			: "server/getAnswersList.php",
				type		: "POST",
				dataType	: "json",
				success		: onSuccess,
				error		: onError
		});
		
		return dfdResult;
	},

	findAllByUserId: function(params) {
		console.log("findAnswersByUser. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response.data );
			}
			else {
				return onError(response);
			}
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findAnswersByUser.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findAllByQuestionId: function(params) {
		console.log("findAllByQuestionId. Params is ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			return dfdResult.resolve(response);
		};

		var onError = function( response ) {
			return dfdResult.reject(response);
		};

		$.ajax({
				url 		: "server/findAnswersByQuestion.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},

	findAnswerById: function( params ) {
		console.log("findAnswerById. Params is : ", params);

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
				url 		: "server/findAnswerById.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError
		});

		return dfdResult;
	},
	
	/*
	 * params = { 	
	 * 				id,
	 * 				content,
	 * 				author
	 * 			}
	**/
	create: function( params ){
		console.log("submitAnswer. Content is : ", params);
		
		var	dfdResult = $.Deferred();
		
		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response );
			}
			else {
				return onError( response );
			}
		};
		
		var onError = function( response ) {
			return dfdResult.reject( response );
		};
		
		$.ajax({
				url			: "server/submitAnswer.php",
				type		: "POST",
				data		: params,
				dataType	: "json",
				success		: onSuccess,
				error		: onError
		});
		
		return dfdResult;
	},

	rateAnswer: function( params ) {
		console.log("in approve. Params is : ", params);

		var dfdResult = $.Deferred();

		var onSuccess = function( response ) {
			if( response.result === "success" ) {
				return dfdResult.resolve( response );
			}
			else {
				return onError( response );
			}
		};

		var onError = function( response ) {
			return dfdResult.reject( response );
		}

		$.ajax({
				url 		: "server/rateAnswer.php",
				type 		: "POST",
				data 		: params,
				dataType 	: "json",
				success 	: onSuccess,
				error 		: onError 
		});

		return dfdResult;
	},
},{});
})(window, $);

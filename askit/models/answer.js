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
			return dfdResult.resolve(response);
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
			return dfdResult.resolve( response );
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
},{});



})(window, $);

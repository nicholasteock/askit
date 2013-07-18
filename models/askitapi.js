$.Class("ASKITAPI",
{
	handleCommonErrors: function( response ) {
		if( response && response.error && response.error.code ) {
			console.warn("ASKITAPI returned an error code: " + response.error.code + "." );
			switch (response.error.code) {
				case "101":
					//Invalid access token
				case "151":
					//Session expired
					console.error("ASKITAPI returned an error code: " + response.error.code + ", forcing an automatic logout." );
					app.authenticateUser();
					return true;
				case "102":
					//Some error.
					break;
			}
		}
		return false;
	},

	convertHttpErrors: function(jqxhr, textStatus, errorThrown, params) {
		console.error("ASKITAPI .convertHttpErrors (jqxhr, textStatus, errorThrown, params) ", jqxhr, textStatus, errorThrown, params );
		
		if( errorThrown == "abort" || textStatus == "abort" ) {
			return null;
		}

		var msg;
		if( jqxhr.status === 0 ) {
			msg = "The network conenction timed out. Please refresh the page to check the status.";
		}
		else {
			msg = "A network error has occurred. (HTTP Error Code: " + jqxhr.status + ")";
		}

		return { code: 0, message: msg };
	},

	// This method parses 8601, but disregards milliseconds and timezone offsets.
	// The date value returned is assumed to be in the browser's local timezone.
	// While this makes the internal representation of the TIME (seconds from
	// Unix epoch) incorrect, it will work for display purposes.
	parseDate: function(s) {
		var rx8601 = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)/,
			dt, // date
			dp; // date parts
// TODO: the below if is an assignment and not a conditional check, is this the actual intent?
		if (dp = s.toString().match(rx8601)) {

			dt = new Date(
				parseInt(dp[1], 10),
				parseInt(dp[3], 10) - 1,
				parseInt(dp[5], 10)
			);
		}
		else {
			if (s) {
				dt = new Date(s);
			}
			else {
				dt = s;
			}
		}
		return dt;
	},
	parseDateTime: function(s) {
		var rx8601 = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)/,
			dt, // date
			dp; // date parts
		if ( !s ) {
			return s;
		}
		// TODO: the below if is an assignment and not a conditional check, is this the actual intent?
		if (dp = s.toString().match(rx8601)) {

			dt = new Date(
				parseInt(dp[1], 10),
				parseInt(dp[3], 10) - 1,
				parseInt(dp[5], 10),
				parseInt(dp[7], 10),
				parseInt(dp[9], 10),
				parseInt(dp[11], 10)
			);
		}
		else {
			dt = new Date(s);
		}
		return dt;
	},

	serializeDate: function(dt, time) {
		// Format integers to have at least two digits.
		var f = function(n) { return n < 10 ? '0' + n : n; };
		var s = "";

		if (dt && dt.getYear) {
			s = dt.getFullYear() + '-' +
			f(dt.getMonth() + 1) + '-' +
			f(dt.getDate());

			if (time != undefined) {
				s += "T";

				if (time === 0) {
					s += "00:00:00";
				}
				else {
					s += "23:59:59";
				}
			}
		}
		return s;
	},
	serializeDateTime: function(dt) {
		var f = function(n) { return n < 10 ? '0' + n : n; };
		var s = "";

		if (dt && dt.getYear) {
			s = dt.getFullYear()	 + '-' +
			f(dt.getMonth() + 1) + '-' +
			f(dt.getDate())      + 'T' +
			f(dt.getHours())     + ':' +
			f(dt.getMinutes())   + ':' +
			f(dt.getSeconds());
		}
		return s;
	},
	serializeDateTimeUTC: function(dt) {
		var f = function(n) { return n < 10 ? '0' + n : n; };
		var s = "";

		if (dt && dt.getYear) {
			s = dt.getUTCFullYear()		+ '-' +
			f(dt.getUTCMonth() + 1) + '-' +
			f(dt.getUTCDate())      + 'T' +
			f(dt.getUTCHours())     + ':' +
			f(dt.getUTCMinutes())   + ':' +
			f(dt.getUTCSeconds());
		}
		return s;
	}
},
{
	init: function(args) {
		var params = $.extend(
			// Start with these defaults.
			{
				type 	: "GET",
				dataType: "json"
			},
			// Mix in the caller's arguments
			args,
			// prefix the URL
			{ url: ASKIT.config.askitapiBaseUrl + args.url }
		);

		if( app.accessToken ) {
			params.headers = { accessToken: app.accessToken };
		}

		// Success and error callbacks
		if( params.success ) {
			this.successCallback = params.success;
		}
		if( params.error ) {
			this.errorCallback = params.error;
		}

		params.success = this.proxy( this.successHandler );
		params.error = this.proxy( this.errorHandler );

		this.params = params;
		this.jqxhr = null;
	},

	//Call the ASKITAPI method
	call: function() {
		this.startTime = new Date();
		this.jqxhr = $.ajax(this.params);

		//Project jqxhr's promise interface to the askitapi interface
		this.jqxhr.promise(this);
		return this.jqxhr;
	},

	//Call the ASKITAPI method but squelch any errors
	fireAndForget: function() {
		delete this.params.error;
		$.ajax(this.params);
	},

	abort: function() {
		if( this.jqxhr ) {
			try {
				this.jqxhr.abort();
			}
			catch(e) {
				this.jqxhr = null;
			}
		}
	},

	/*
		Function that is called when the request succeeds. The function gets passed 3 arguments:
			1. Data returned from the server, formatted according to the dataType parameter.
			2. String describing the status.
			3. jqXHR object.
	*/
	successHandler: function(response, textStatus, jqXHR) {
		if( !response || response.result == "failure" ) {
			if( !this.Class.handleCommonErrors(response)) {
				if( this.errorCallback ) {
					if( response && response.error ) {
						this.errorCallback(response.error);
					}
					else {
						this.errorCallback(response);
					}
				}
			}
		}
		else if( this.successCallback ) {
			this.successCallback(response.data);
		}
	},

	/*
		Function that is called when request fails. Teh function receives 3 arguments:
			1. jqXHR object.
			2. String describing the type of error that occurred
			3. Optional exception object, if any occurred.
	*/
	errorHandler: function(jqXHR, textStatus, errorThrown) {
		var error = this.Class.convertHttpErrors(jqXHR, textStatus, errorThrown, this.params);

		if(error && this.errorCallback) {
			this.errorCallback(error);
		}
	},
});
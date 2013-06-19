if( ! window.Askit ) window.Askit = {};

Askit.RouteHelper = {
	defaultPageController	: "homepage",
	
	getRouteObjectFromUrlHash: function(locationHash){
		var queryPos,
			query,
			params = {},
			nv,
			address,
			prmValue,
			id;
			
		address = app._normalizeHash( locationHash );
		queryPos = address.indexOf("?");
		if(queryPos !== -1) {
			query = address.substring(querypos+1);
			if(query.indexOf("&") !== -1) {
				query = query.split("&");
			}
			else {
				query = [query];
			}
			
			for( var a=0; a<query.length; a++){
				if(query[a].indexOf("=") != -1){
					nv = query[a].split("=");
					if( nv[1] ){
						prmValue = nv[1];
					}
				}
			}
			
			address = app._normalizeHash(address.substring(0, queryPos));
		}
		return{ routeName: address, params: params };
	},
};

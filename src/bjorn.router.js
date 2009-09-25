//= require 'bjorn.base.js'

Bjorn.Router = {
	_routes: [],
	draw: function(callback){
		(callback.bind(this))(Bjorn.Router);
	},
	connect: function(path, callback){
		var keys = [];
		
		if(Bjorn.is_a(path, RegExp)){
			this._routes.push([path, callback, keys]);
		}
		else if(Bjorn.is_a(path, String)){
			var rs = path.replace(/(:\w+)/gi, function(e){
				keys.push(e.slice(1));
				return "([^/?&#]+)";
			});
			var pattern = new RegExp("^" + rs + "$");
			this._routes.push([pattern, callback, keys]);
		}
	},
	invoke: function(path, memo){
		var matchingRoute, matches;
		
		for (var i = 0, length = this._routes.length; i < length; i++){
			var r = this._routes[i];
			var pattern = r[0];
			
			if(matches = pattern.exec(path)) {
				matchingRoute = r;
				break;
			}
		};
		
		if(matchingRoute) {
			var callback    = matchingRoute[1];
			var namedParams = matchingRoute[2];
			var params = {};
			params.memo = (memo || {});
			matches = matches.slice(1);
			
			if(namedParams.length > 0){
				for(var ii = 0, length = namedParams.length; ii < length; ii++)
					params[namedParams[ii]] = matches[ii];				
			}
			
			params.matchedPath = path;
			callback(params);
		}
	}
};

$B = Bjorn.Router.connect.bind(Bjorn.Router);
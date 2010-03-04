Bjorn.toArray = function(iterable){
	if (!iterable) return [];
  if (iterable.toArray) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
};

Bjorn.is_a = function(obj, klass){
	return !!(obj.constructor == klass);
};

Bjorn.bind = function() {
	if (arguments.length < 3 && (typeof arguments[1] == "undefined"))
		return arguments[0];
	var args = Bjorn.toArray(arguments), fn = args.shift(), object = args.shift();
	return function() {
		return fn.apply(object, args.concat(Bjorn.toArray(arguments)));
	};
};

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

Function.prototype.bind = function() {
	if (arguments.length < 2 && (typeof arguments[0] == "undefined")) return this;
	var __method = this, args = Bjorn.toArray(arguments), object = args.shift();
	return function() {
		return __method.apply(object, args.concat(Bjorn.toArray(arguments)));
	};
};

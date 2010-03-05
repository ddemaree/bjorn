/* Bjorn Framework, version <%= BJORN_VERSION %>
 * (c) 2009 <%= BJORN_AUTHOR %>
 * Distributed under the terms of an MIT-style license */

(function(){
	var previousBjorn = window.Bjorn;
	var previousShortcuts = {};
	var shortcut, shortcuts = '$B $BA $_B $_R'.split(' ');
	while (shortcut = shortcuts.shift())
		previousShortcuts[shortcut] = window[shortcut];
	
	Bjorn = {
		VERSION: '<%= BJORN_VERSION %>'
	};
	
	Bjorn.noConflict = function(extreme){
		for (var key in previousShortcuts) {
			if (previousShortcuts.hasOwnProperty(key))
				window[key] = previousShortcuts[key];
		}
		if (extreme)
			window.Bjorn = previousBjorn;
	};
})();


//= require "bjorn.helpers"
//= require "bjorn.router"
//= require "bjorn.anchor_observer"
//= require "bjorn.anchor_iframe"
//= require "bjorn.shortcuts"

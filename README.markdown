# CODENAME: BJØRN #

Bjørn is an experimental JavaScript framework combining the familiarity of URI request paths, the power of Rails/Sinatra controllers and the _awesomeness_ of JavaScript.

In a nutshell, Bjørn allows you to set up Sinatra-like methods that respond to string or RegExp routes.

## How it works ##

You use the `Bjorn.Router.connect` method to wire up your routes:

	Bjorn.Router.connect("abc", function(){
		alert("I know my alphabets!")
	});
	
And the `Bjorn.Router.invoke` method to call them later:

	// This will show the alert: "I know my alphabets!"
	Bjorn.Router.invoke("abc");

Routes can contain named parameters:

    Bjorn.Router.connect("assets/:id", function(params){
		console.log(params.id);
	})
	
	//>> Bjorn.Router.invoke("assets/42");
	//=> 42

You can pass in memo objects at invocation:

	Bjorn.Router.connect("abc", function(params){
		console.log(params.memo.whatsUp)
	});
	
	//>> Bjorn.Router.invoke("abc", {whatsUp: "buttercup"})
	//=> "buttercup"

If regular expressions are more your thing, you can use those instead:

	Bjorn.Router.connect(/assets\/(\d+)/gi, function(p){
		console.log(params.matches[1]);
	});
	
	//>> Bjorn.Router.invoke("assets/114")
	//=> "114"
	
And it's designed to work wonderfully with your JavaScript framework of choice:

	// This is jQuery
	Bjorn.Router.connect("abc", function(params){
		$('.myclassname').hide();
	});
	
	$(document).ready(function(){
		Bjorn.Router.invoke("abc");
	});
	
You can find some more extensive examples in the `examples` folder.

## Building Bjørn ##

To build Bjørn, you'll need Ruby, RubyGems, and the [Sprockets](http://getsprockets.org/) preprocessor, the latter of which you can install like so:

    gem install -r sprockets

This will compile Bjørn into your `dist` folder. If your copy of the source tree doesn't include `dist/bjorn.js` you'll want to do a build before attempting to run any of the tests.

## What's this about tests? ##

Bjørn is _totally_ test-driven, via Nick Kallen's [Screw.Unit](http://github.com/nkallen/screw-unit/) library. To run the tests, just open `spec/suite.html` in your browser of choice. The test suite is evolving, and if some enterprising soul wanted to look into making the test suite run under Selenium or some other automated system, your humble author would not say no.
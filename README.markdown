# Route your JavaScript with BJØRN #

Bjørn is an experimental JavaScript routing DSL combining the familiarity of URI request paths, the power of Rails/Sinatra controllers and the _awesomeness_ of JavaScript.

In a nutshell, Bjørn allows you to take string or RegExp routes similar to those used in [Sinatra](http://sinatrarb.com/), and bind them to JavaScript functions, essentially providing a lightweight controller layer for your JavaScript code. Seriously.

## How it works ##

You use the `Bjorn.Router.connect` method to wire up your routes:

	Bjorn.Router.connect("abc", function(){
		alert("I know my alphabets!")
	});
	
And the `Bjorn.Router.invoke` method to call them later:

	// This will show the alert: "I know my alphabets!"
	Bjorn.Router.invoke("abc");
	
Of course, `Bjorn.Router` is a lot to type if you're defining multiple routes, so you can also use a Rails-like block syntax to define your routes like so:

    Bjorn.Router.draw(function(map){
        
        map.connect("/abc", function(){
            alert("Easy as 1-2-3!");
        });
        
        map.connect("/abc/123", function(){
            alert("See? Easy, just like I said.");
        });
        
    });

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

## Why should I use Bjørn? ###

There are a few cool things you can do with it—that, in fact, your humble author is already doing with it:

#### Custom events, without the DOM ####

Both Prototype and jQuery offer the ability to define custom DOM events. Which is cool and all, and both frameworks' implementations are very nice, except one thing: _They're both coupled to the DOM._ Maybe you _do_ always want to fire an event on a given element, but you shouldn't have to do `$(document).fire('my:event')` just because JavaScript assumes events are always of the click/mouseover/load variety.

In Bjørn, paths are in the global namespace and can be called from anywhere — even inside of a custom (or not-so-custom) event.

    // Using Prototype and Script.aculo.us
    Bjorn.Router.connect("touchHeart", function(params){
       if(params.memo.myArgument == "pulsate")
         new Effect.Pulsate(params.memo.element);
    });
    
    function makeHeartBeat(e){
        var myHeart = $('myHeart');
        Bjorn.Router.invoke("touchHeart", {
            element: myHeart,
            myArgument: 'pulsate'
        });
        e.stop();
    }
    
    $('myHeart').observe('click', makeHeartBeat);
    $('defibrillator').observe('click', makeHeartBeat);

#### Anchor observation ####

Bjørn makes it easy to bind JavaScript/Ajax behaviors to the anchor/hash component of a page's URL, regardless of which framework you're in. For example, maybe you want to pass the contents of the hash to a RESTful web service:

    // http://mysite.com/#/assets/22.json
    Bjorn.Router.draw(function(map){
        // doAjaxyThing is the function that would, y'know,
        // do something Ajaxy
        map.connect("/assets/:id.:format", doAjaxyThing);
    });
    
But how do you watch for changes to the anchor? Bjørn makes it easy by including an anchor observer class:

    $.ready(function(){
       new Bjorn.AnchorObserver(function(anchorChange){
           if(anchorChange.to.match(/^\/cookies/))
              alert("COOKIES! NOM NOM NOM NOM");
           else
              Bjorn.Router.invoke(anchorChange.to);
       }); 
    });
    
Of course, if you expect all your anchors to correspond to Bjørn routes, you can skip the callback function and just do this:

    $.ready(function(){
        new Bjorn.AnchorObserver;
    });
    
Bjørn fails gracefully if a route doesn't match, so you can just set this and forget it.

## Using Bjørn in your project, in three simple steps ##

#### 1. Get the latest Bjorn source ####

You'll find it in the `dist` folder of this project. Eventually I'll post release builds to the Downloads section on GitHub, but for now just clone, copy and go.

#### 2. Include it in your HTML page ####

I shouldn't have to tell you how to do this part, but I will anyway:

    <!-- Omitting the type attribute because the
         cool kids are into HTML 5 and I am cool -->
    <script src="/yourJSFolder/bjorn.js"></script>
    
#### 3. Drink an entire glass of your finest single malt scotch ####

Step 3 is optional to getting Bjørn working, but may improve your experience significantly.

Seriously, though, there's no step 3. Bjørn is written in core JavaScript and doesn't require any other libraries or frameworks to work.

## Building Bjørn ##

To build Bjørn, you'll need Ruby, RubyGems, and the [Sprockets](http://getsprockets.org/) preprocessor, the latter of which you can install like so:

    gem install -r sprockets
    
You'll also want to install the `JSMin` gem, as the build task minifies the JS source for fasty-loadingness:

    gem install -r jsmin
    
Then, when you're all set, just run the build rake task:

    cd /your/path/to/bjorn
    rake build

This will compile Bjørn into your `dist` folder. If your copy of the source tree doesn't include `dist/bjorn.js` you'll want to do a build before attempting to run any of the tests.

## What's this about tests? ##

Bjørn is _totally_ test-driven, via Nick Kallen's [Screw.Unit](http://github.com/nkallen/screw-unit/) library.

To run the tests, just open `spec/suite.html` in your browser of choice.

The test suite is evolving, and if some enterprising soul wanted to look into making the test suite run under Selenium or some other automated system, your humble author would not say no.
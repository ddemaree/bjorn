Screw.Unit(function(){
	describe('Bjorn.Router', function(){
		describe("#connect", function(){
			
			before(function() {
        Bjorn.Router._routes = [];
      });
			
			it("should append a new route", function(){
				Bjorn.Router.connect("abc", function(){ return "123"; })
				expect(Bjorn.Router._routes.length).to(equal, 1);
			});
			
			it("should translate a string route to a RegExp", function(){
				Bjorn.Router.connect("abc/:id", function(){ return "123"; })
				
				var firstRoute = Bjorn.Router._routes[0];
				expect( firstRoute[0].constructor ).to(equal, RegExp);
			});
			
			it("should accept a regexp route", function(){
				Bjorn.Router.connect(/abcd/gi, function(){ return "123"; });
				var firstRoute = Bjorn.Router._routes[0];
				expect( firstRoute[0].constructor ).to(equal, RegExp);				
			});
			
			it("should store named keys from a string route", function(){
				Bjorn.Router.connect("abc/:id", function(){ return "123"; })
				
				var firstRoute = Bjorn.Router._routes[0];
				expect( firstRoute[2] ).to_not(be_null);
				expect( firstRoute[2].constructor ).to(equal, Array);
				expect( firstRoute[2] ).to(equal, ["id"]);
			});
			
		});
		
		describe("#invoke", function(){
			before(function(){
				Bjorn.Router._routes = [];
			});
			
			it("should call the callback function", function(){
				var result;
				
				Bjorn.Router.connect("abc", function(p){
					result = "Hi!";
				} );
				
				Bjorn.Router.invoke("abc");
				expect( result ).to_not(be_null);
				expect( result ).to(equal, "Hi!");
			});
			
			it("should pass along named params", function(){
				var result;
				Bjorn.Router.connect("path/:id/:other", function(p){
					if(p.id) result = p.id + "|" + p.other;
				});
				
				Bjorn.Router.invoke("path/1234/5678");
				expect( result ).to(equal, "1234|5678");
			});
			
			it("should pass along a memo", function(){
				var result;
				Bjorn.Router.connect("path", function(p){
					if(p.memo) result = p.memo;
				})
				
				Bjorn.Router.invoke("path", "hi there");
				expect( result ).to(equal, "hi there");
			});
			
		});
		
	});
});
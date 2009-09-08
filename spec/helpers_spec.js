Screw.Unit(function(){
	
	describe("Object", function(){
		
		describe("#is_a", function(){
			it("should identify strings", function(){
				expect( ("Hello world").is_a(String) ).to(be_true);
				expect( ("Hello world").is_a(RegExp) ).to_not(be_true);
			});
			
			it("should identify numbers", function(){
				expect( (99).is_a(Number) ).to(be_true);
				expect( (99.99).is_a(Number) ).to(be_true);
			});
			
			it("should identify regular expressions", function(){
				expect( /abcd/.is_a(RegExp) ).to(be_true);
			});
			
			it("should identify functions", function(){
				var f = function(){ return "Hi" };
				expect( f.is_a(Function) ).to(be_true);
			});
			
		});
	});
	
});
	
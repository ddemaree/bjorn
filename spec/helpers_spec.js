Screw.Unit(function(){
	
	describe("Bjorn", function(){
		
		describe("#is_a", function(){
			it("should identify strings", function(){
				expect( Bjorn.is_a("Hello world", String) ).to(be_true);
				expect( Bjorn.is_a("Hello world", RegExp) ).to_not(be_true);
			});
			
			it("should identify numbers", function(){
				expect( Bjorn.is_a(99, Number) ).to(be_true);
				expect( Bjorn.is_a(99.99, Number) ).to(be_true);
			});
			
			it("should identify regular expressions", function(){
				expect( Bjorn.is_a(/abcd/, RegExp) ).to(be_true);
			});
			
			it("should identify functions", function(){
				var f = function(){ return "Hi"; };
				expect( Bjorn.is_a(f, Function) ).to(be_true);
			});
			
		});
	});
	
});
	
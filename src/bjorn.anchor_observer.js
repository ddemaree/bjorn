//= require 'bjorn'
//= require 'bjorn.helpers'

(function(Bjorn){
	Bjorn.AnchorObserver = function(callback){
		if(callback && Bjorn.is_a(callback, Function))
			this.onAnchorChanged = Bjorn.bind(callback, this);
		else
			this.onAnchorChanged = this._onAnchorChanged;
		
		setInterval(Bjorn.bind(this.poll, this), (0.1 * 1000));
	};
	
	Bjorn.AnchorObserver.prototype = {
		lastAnchor: '',
		_onAnchorChanged: function(changes){
			Bjorn.Router.invoke(changes.to);
		},
		poll: function(){
			var anchor = (window.location.hash || "").slice(1);
			if(anchor != this.lastAnchor)
				this.onAnchorChanged( { from:this.lastAnchor, to:anchor } );
			this.lastAnchor = anchor;
		}
	};
})(Bjorn);

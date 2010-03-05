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
		anchor: '',
		lastAnchor: '',
		_onAnchorChanged: function(changes){
			Bjorn.Router.invoke(changes.to);
		},
		poll: function(){
			var href = window.location.href;
			var anchorIndex = href.indexOf('#');
			var anchor = (anchorIndex >= 0) ? href.substr(anchorIndex + 1) : '';
			if (anchor != this.anchor) {
				this.lastAnchor = this.anchor;
				this.anchor = anchor;
				this.onAnchorChanged( { from:this.lastAnchor, to:anchor } );
			}
		}
	};
})(Bjorn);

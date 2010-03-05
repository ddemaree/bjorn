//= require 'bjorn'
//= require 'bjorn.helpers'
//= require 'bjorn.anchor_observer'

(function(Bjorn) {
	// Mirrors the current anchor changes into a hidden iframe. This ensures
	// that back/forward navigation will still work for IE 6 and 7, which don't
	// support anchor history.
	Bjorn.AnchorIFrame = function(){
		this.lastAnchor = '';
		this.ready = false;
		
		// Create the iframe element
		this.element = document.createElement('iframe');
		this.element.style.visibility = 'hidden';
		this.element.style.position = 'absolute';
		this.element.style.top = this.element.style.left = '-1000px';
		document.body.appendChild(this.element);
		
		// Create an observer just for the iframe
		this.observer = new Bjorn.AnchorObserver(Bjorn.bind(function(anchor) {
			if (this.ready)
				this.update(anchor.to);
		}, this));
		
		this._initialize();
	};
	
	Bjorn.AnchorIFrame.prototype = {
		// Return the current anchor value stored in the iframe
		get: function() {
			if (this.ready)
				return this.element.contentWindow.document.body.innerText || '';
			else
				return '';
		},
		
		// Update the iframe with the current anchor
		update: function(anchor) {
			if (!this._available())
				return false;
			this.lastAnchor =  anchor;
			if (this.get() === this.lastAnchor)
				return true;
			try {
				var doc = this.element.contentWindow.document;
				doc.open();
				doc.write('<html><body>'+anchor.to+'</body></html>');
				doc.close();
				return true;
			}
			catch (e) {
				return false;
			}
		},
		
		// Return true if we have a valid iframe body element
		_available: function() {
			return (
				this.element &&
				this.element.contentWindow &&
				this.element.contentWindow.document &&
				this.element.contentWindow.document.body);
		},
		
		_initialize: function() {
			if (this.available()) {
				this.update(this.observer.anchor);
				this.ready = true;
				this._poll();
			}
			else
				setTimeout(Bjorn.bind(this._initialize, this), 0.1 * 1000);
		},
		
		_poll: function() {
			var iframeAnchor = this.get();
			if (iframeAnchor != this.lastAnchor)
				window.location.hash = this.lastAnchor = iframeAnchor;
		}
	};
})(Bjorn);

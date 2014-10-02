//parts of the code from http://stackoverflow.com/questions/17360739/jquery-animate-for-element-attributes-not-style
/*
 * @param attrs {number} attributes or CSS properties to animate towards
 * @param speed {number} duration of the animation in milliseconds
 * @param x1 {number} cubic bezier x1
 * @param y1 {number} cubic bezier y1
 * @param x2 {number} cubic bezier x2
 * @param y2 {number} cubic bezier y2
 * @param attrmode {boolean} if true, attributes will be animated. If false, CSS properties will be animated
 */
$.fn.animateInterpolated = function(attrs, speed, callback, x1, y1, x2, y2, attrmode){
	
	var _xnf = this;

	if( $("head").find("#animateInterpolatedWKB").length < 1 ) {
		$("head").append("<script src='/scripts/webkit-bezier.js' id='animateInterpolatedWKB'>");
	}
	
	var ts = Date.now();

	if( !attrs ) {
		throw "No attributes defined";
	}

	x1 = x1 || 0.2;
	y1 = y1 || 0.3;
	x2 = x2 || 0.0;
	y2 = y2 || 1.0;

	// duration in ms
	speed = speed || 500;

	var start = {}, // object to store initial state of attributes
		timeout = 5, // interval between rendering loop in ms
		steps = Math.floor(speed/timeout), // number of cycles required
		cycles = steps; // counter for cycles left

	// populate the object with the initial state
	$.each(attrs, function(k,v) {
		_xnf.attr("data-interpolater-" + k, ts);
		if( attrmode ) {
			start[k] = _xnf.attr(k);
		} else {
			start[k] = parseInt(_xnf.css(k));
		}
	});
	
	for( var x in start ) {
		if( isNaN( start[x] ) ) {
			start[x] = 0;
		}
	}
	
	var check = 0;
	(function loop() {
		for( var x in attrs ) {
			var k = x;
			var v = attrs[x];
			var pst = (v - start[k]) * ( ( Bezier.cubicBezier(.2,.3,0,1, 1 / steps * (steps - cycles), speed) ) );
			check++;
			//if( check == 10 ) {
				check = 0;
				if( parseInt(_xnf.attr("data-interpolater-" + k)) != ts ) {
					continue;
				}
			//}
			if( attrmode ) {
				_xnf.attr(k, function(i, old) {
					return parseInt(start[k]) + pst;
				});
			} else {
				_xnf.css(k, function(i, old) {
					return parseInt(start[k]) + pst;
				});
			}
		}

	if (--cycles) // call the loop if counter is not exhausted
		setTimeout(loop, timeout);
	else {// otherwise set final state to avoid floating point values
		if( attrmode ) {
			//_xnf.attr(attrs);
			$.each(attrs,function(k,v){
				if( parseInt("data-interpolater-" + k) == ts ) {
					$(_xnf).attr(k,v);
				}
			});
		} else {
			//_xnf.css(attrs);
			$.each(attrs,function(k,v){
				if( parseInt("data-interpolater-" + k) == ts ) {
					$(_xnf).css(k,v);
				}
			});
		}
		if( callback ) {
			try {
				callback();
			} catch(err) {
				throw err;
			}
		}
	}

	})(); // start the loop
	return this;
};
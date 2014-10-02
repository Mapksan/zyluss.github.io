
var menu = {};

$(document).ready(function(){
	
	var ap = "";
	ap+="<svg id='menu' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'>";
	ap+="<line id='linetop' fill='none' stroke='#FFFFFF' stroke-width='8' stroke-miterlimit='10' x1='0' y1='21.8' x2='100' y2='21.8'/>";
	ap+="<line id='linemid' fill='none' stroke='#FFFFFF' stroke-width='8' stroke-miterlimit='10' x1='0' y1='50.0' x2='100' y2='50.0'/>";
	ap+="<line id='linebot' fill='none' stroke='#FFFFFF' stroke-width='8' stroke-miterlimit='10' x1='0' y1='78.2' x2='100' y2='78.2'/>";
	ap+="</svg>";
	
	$("#menu").replaceWith(ap);
	
	var m = $("#menu");
	var lt = $("#menu #linetop");
	var lm = $("#menu #linemid");
	var lb = $("#menu #linebot");
	
	menu.reset = function() {
		$(lt).animateInterpolated({
			x1: 0,
			y1: 21.8,
			x2: 100,
			y2: 21.8
		},500, null, .2,.3,0,1, true);
		$(lm).animateInterpolated({
			x1: 0,
			y1: 50,
			x2: 100,
			y2: 50
		},500, null, .2,.3,0,1, true);
		$(lb).animateInterpolated({
			x1: 0,
			y1: 78.2,
			x2: 100,
			y2: 78.2
		},500, null, .2,.3,0,1, true);
	}
	menu.arrow = {};
	menu.arrow.up = function() {
		$(lt).animateInterpolated({
			x1: 50,
			y1: 3,
			x2: 95,
			y2: 50
		},500, null, .2,.3,0,1, true);
		$(lm).animateInterpolated({
			x1: 50,
			y1: 0,
			x2: 50,
			y2: 100
		},500, null, .2,.3,0,1, true);
		$(lb).animateInterpolated({
			x1: 50,
			y1: 3,
			x2: 5,
			y2: 50
		},500, null, .2,.3,0,1, true);
	}
	
	$(m).click(function(){
		if( $("#nav").hasClass("exp") ) {
			$("#nav").removeClass("exp");
			$("#menuview .nav").attr("tabindex","-1");
			menu.reset();
		} else {
			$("#nav").addClass("exp");
			$("#menuview .nav").attr("tabindex","0");
			menu.arrow.up();
		}
	});
	
	$("#menuview .nav").click(function(e){
		
		if( e.which == 2 ) {
			return;
		}
		e.preventDefault();
		$("#nav").removeClass("exp");
		menu.reset();
		if( !$(this).attr("href") ) {
			return;
		}
		var href = $(this).attr("href");
		setTimeout(function(){
			document.location = href;
		},500);
		
	});
	
	$(document).keydown(function(e){
		
		if( String.fromCharCode( e.which ) == "m" || String.fromCharCode( e.which ) == "M" ) {
			$(m).click();
			$("*").blur();
			setTimeout(function(){
				$("#menuview").find(".nav").first().focus();
			},10);
		}
		
		if( $("#nav").hasClass("exp") ) {
			if( e.which == 38 ) { //up arrow
				
				e.preventDefault();
				
				$(".nav:focus").prev(".nav").focus();
				
			}
			else if( e.which == 40 ) { //down arrow
				
				e.preventDefault();
				
				$(".nav:focus").next(".nav").focus();
					
			} else if( e.which == 13 ) {
				
				if( !$(".nav:focus").length ) {
					return;
				}
				
				var href = $(".nav:focus").attr("href");
				
				if( !href ) {
					return;
				}
				e.preventDefault();
				
				$("#nav").removeClass("exp");
				menu.reset();
				$("*").css("pointer-events","none");
				setTimeout(function(){
					var addSlash = "";
					if( href.substr( href.length - 1, href.length ) != "/" ) {
						addSlash = "/";
					}
					document.location = href + addSlash + "?h=" + $("#canvas").height();
					$("*").css("pointer-events","");
				},500);
			}
		}
		
	});
	
	$("#menuview .nav").attr("tabindex","-1");
	
});
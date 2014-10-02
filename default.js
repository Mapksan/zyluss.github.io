
$("head").append("\
<script src='/scripts/interpolater.js'></script>\
<script src='/scripts/menu.js'></script>\
");
$("head").prepend("\
<link rel='stylesheet' href='/stylesheets/default.css'>\
");

$(document).ready(function(){
	
	//URL query
	var uq = window.location.search.slice(1); //get the string after ?
	var uqt = uq.split("&"); //split it into the sections
	var query = {};
	//now split it into each of the parts
	for( var x in uqt ) {
		query[uqt[x].split("=")[0]] = uqt[x].split("=")[1];
	}
	uqt = null; //remove this variable cuz katz

	if( query.h ) {
		if( query.h.match("\\d+")) {
			$("#canvas").css("transition","height 0s");
			setTimeout(function(){
				var dheight = $("#canvas").height();
				$("#canvas").css("height", parseInt(query.h)).css("transition","");
				setTimeout(function(){
					$("#canvas").css("height",dheight);
					setTimeout(function(){
						$("#canvas").css("height","");
					},500);
				},2);
			});
		}
	}

	$(".nav").click(function(e){
		if( e.which == 2 ) {
			return;
		}
		e.preventDefault();

		if( $(this).attr("href") ) {
			var out = $(this).attr("href");
			if( $(this).attr("href").substr( $(this).attr("href").length - 1, $(this).attr("href").length ) != "/" ) {
				out += "/";
			}
			document.location = out + "?h=" + Math.round($("#canvas").height()).toFixed(2);
		}

	});
	
	$(document).keydown(function(e){
		
		if( !$("#nav").hasClass("exp") ) {
			if( e.which == 38 ) {
				e.preventDefault();
				$("html, body").animate({
					scrollTop: $(window).scrollTop() - 100
				},100);
			} else if( e.which == 40 ) {
				e.preventDefault();
				$("html, body").animate({
					scrollTop: $(window).scrollTop() + 100
				},100);
			}
			
		}
		
	});

})
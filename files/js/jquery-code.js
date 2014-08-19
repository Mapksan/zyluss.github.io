var goToURL = null;

$('a').click(function() {
   var goToURL = $(this).attr("href");
     $(el).delay(500 * i).animate({'left': '-300px'}, 1000, function() {window.location = gotoURL;});
     return false; // or e.preventDefault();
   }
);

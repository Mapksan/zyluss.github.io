
function projectEventHandlers() { //will be called somewhere in the HTML file

  $(".project a").click(function(e){ //click handler for links in the projects list
    e.preventDefault(); //prevent default action, which is opening a new window
    
    if( !$(this).parent().find(".viewframe").length ) { //check if view frame exists
      //if not, create it
      $(this).parent().append("\
        <iframe class='viewframe' frameborder='0' src='"+ $(this).attr("href") +"'></iframe>");
    }
    if( !$(this).parent().find(".viewframe").hasClass("open")) { //if it is not already open
      //set a timeout of 10 milliseconds so that the animation plays even right after the object was created
      var el = this; // "this" inside another function doesn't reference the "this" which is wanted
      setTimeout(function(){
        $(el).parent().find(".viewframe").addClass("open"); //open the view frame
      },10);
    } else {
      $(this).parent().find(".viewframe").removeClass("open");
    }
  });
  
}
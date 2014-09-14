
$(document).ready(function(){
  $("#footer").click(function(){
    $("#footer").css({"padding-top":"5%","padding-bottom":"5%"});
  });

  
  $("nav a#hover").click(function(e){
    e.preventDefault();
    
    var href = $(this).attr("href");
    var obj = this;
    setTimeout(function(){
      $("body").prepend("<div id='anim'></div>");
      $("#anim").css("top", $(obj).offset().top )
      .css("left", $(obj).offset().left )
      .css("position", "fixed")
      .css("width", $(obj).innerWidth())
      .css("height", $(obj).innerHeight())
      .css("z-index","1000000")
      .css("background", "#ff9900")
      .css("transition","all 0.7s cubic-bezier(.2,.3,0,1)")
      .css("opacity","1");
    
      setTimeout(function(){
        $("#anim").css("top",0)
        .css("left",0)
        .css("width","100%")
        .css("height","100%")
        .css("opacity",1);
        setTimeout(function(){
          if( href == null ) {
            $("#anim").css("opacity",0);
            $("#anim").css("pointer-events","none");
          } else {
            window.location = href;
          }
        },700);
      },10);
    },10);
  
  });
  
});


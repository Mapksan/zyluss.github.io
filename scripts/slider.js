jQuery(document).ready(function ($) {
    
  var _int = setInterval(function(){},10000000); //dummy
  
  function newInterval() { //used for resetting the setInterval timer to 5000
    clearInterval(_int);
    _int = setInterval(function () {
      moveRight();
    }, 5000);
  }
  
  $(document).ready(function(){
    newInterval();
  });

  var slideCount = $('#slider ul li').length;
  var slideWidth = $('#slider ul li').width();
  var slideHeight = $('#slider ul li').height();
  var sliderUlWidth = slideCount * slideWidth;

  $('#slider').css({ width: slideWidth, height: slideHeight });

  $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

  $('#slider ul li:last-child').prependTo('#slider ul');

  function moveLeft() {
    $('#slider ul').animate({
        left: + slideWidth
    }, 200, function () {
        $('#slider ul li:last-child').prependTo('#slider ul');
        $('#slider ul').css('left', '');
    });
  };

  function moveRight() {
    $('#slider ul').animate({
        left: - slideWidth
    }, 200, function () {
        $('#slider ul li:first-child').appendTo('#slider ul');
        $('#slider ul').css('left', '');
    });
  };

  $('a.control_prev').click(function () {
    moveLeft();
    newInterval(); //make sure it waits 5 seconds before continuing
  });

  $('a.control_next').click(function () {
    moveRight();
    newInterval(); //make sure it waits 5 seconds before continuing
  });

});    

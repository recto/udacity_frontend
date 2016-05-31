var num_click = 0;
var num_chewie_click = 0;

$('.cat').click(function() {
  var $cat_clicked = $('.cat-clicked');
  num_click++;
  $cat_clicked.text("You clicked " + num_click + " times.");
});

$('.chewie').click(function() {
  var $chewie_clicked = $('.chewie-clicked');
  num_chewie_click++;
  $chewie_clicked.text("You clicked Chewie " + num_chewie_click + " times.");
});

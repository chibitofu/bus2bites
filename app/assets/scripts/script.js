$(document).ready(function() {


});

$('#sub-butt').on('click', function(e) {
  e.preventDefault();
  var busRoute = parseInt($('.bus-route').val());

  $.ajax({
    url: /route,
    method: GET,
    data: busRoute,
    success: function(data, status) {
      console.log(status);
    },
    error: function(xhrt, status, error) {
      console.log(status);
    }
  })
});

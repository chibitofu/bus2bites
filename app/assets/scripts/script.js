$('#sub-butt').on('click', function(e) {
  e.preventDefault();
  var busRoute = parseInt($('.bus-route').val());
  var places;

  $.ajax({
    url: 'http://localhost:3000/routes/:id',
    method: 'GET',
    data: busRoute,
    success: function(data, status) {
      places = data;
      $('#route-form').hide()
      routeList(places);
    },
    error: function(xhrt, status, error) {
      console.log(status);
    }
  })

});


function routeList(places) {
  var items = places.restaurants
  for(var i = 0; i < items.length; i++) {
    $('#results').append(
      '<li class="restaurants">' +
      '<h3>' +
      items[i].name +
      '</h3>' +
      '<p>' +
      items[i].image +
      '</p>' +
      '</li>'
    );
  }

}

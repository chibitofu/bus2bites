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
  var item = places.restaurants;
  console.log(item);
  for(var i = 0; i < item.length; i++) {
    $('#results').append(
      '<section class="restaurants" onclick="restaurantDetail(this)">' +
        '<div class="row">' +
          '<p class="restaurant-name">' +
            item[i].name +
          '</p>' +
        '</div>' +
        '<div class="row">' +
          '<div class="col-xs-4">' +
            '<img class="img-responsive restaurant-icon" src="' +
              item[i].icon +
            '">' +
          '</div>' +
          '<div class="col-xs-8">' +
            '<p class="restaurant-address">' +
              item[i].street_address +
            '</p>' +
            '<p class="restaurant-hours">' +
              item[i].hours +
            '</p>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

}

function restaurantDetail(t) {
  console.log(t);
}

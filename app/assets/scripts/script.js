var item;

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

//Creates a list of restaurants//
function routeList(places) {
  item = places.restaurants;
  var prices = '';
  console.log(item);

  for(var i = 0; i < item.length; i++) {
    //Creates $$$ for price_level//
    for (var j = 0; j < item[i].price_level; j++) {
      prices += '$';
    }

    $('#results').append(
      '<section class="restaurants" onclick="restaurantDetail(' +
        i +
      ')">' +
        '<div class="row restaurant-name">' +
          '<p>' +
            item[i].name +
            '<span>' +
              prices +
            '</span>' +
          '</p>' +
        '</div>' +
        '<div class="row restaurant-bottom">' +
          '<div class="col-xs-4">' +
            '<img class="img-responsive restaurant-icon" src="' +
              'http://lorempixel.com/200/200/cats' +
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
    prices = '';
  } //end of i for loop//

}

function restaurantDetail(elem) {
  console.log(elem);
}

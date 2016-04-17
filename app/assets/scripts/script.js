var item;
var busLoc = {};
var biteLoc = {};

$('#sub-butt').on('click', function(e) {
  e.preventDefault();
  var busRoute = parseInt($('.bus-route').val());
  var places;

  $.ajax({
    url: 'http://localhost:3000/routes/' + busRoute,
    method: 'GET',
    data: busRoute,
    success: function(data, status) {
      places = data;
      $('#route-form').hide()
      console.log(places);
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
  //Gets rid of margin on top-bar//
  $('.top-bar').removeClass('bot-mar');

  $('body').css({
    'background-image' : 'none'
  })
  $('#result').html('');
  $('#result').show();
  for(var i = 0; i < item.length; i++) {
    //Creates $$$ for price_level//
    for (var j = 0; j < item[i].price_level; j++) {
      prices += '$';
    }

    //Generates html element for each restaurant//
    $('#results').append(
      '<section class="restaurants" onclick="restaurantDetail(' +
        i +
        ',' +
        "'" +
        prices +
        "'" +
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

//Returns one restaurant based on the idx of the item//
function restaurantDetail(idx, prices) {
  busLoc = {
      lat: item[idx].bus_lat,
      lng: item[idx].bus_lng
    };

  biteLoc = {
      lat: item[idx].bite_lat,
      lng: item[idx].bite_lng
    };


  $('#results').hide();
  $('#single-result').show();
  $('#single-result').removeClass('hidden');
  $('.result').html('');
  $('.result').append(
    '<section class="restaurants">' +
      '<div class="row restaurant-name">' +
        '<p>' +
          item[idx].name +
          '<span>' +
            prices +
          '</span>' +
        '</p>' +
      '</div>' +
      '<div class="row">' +
        '<div class="col-xs-4">' +
          '<img class="img-responsive restaurant-icon" src="' +
            'http://lorempixel.com/200/200/cats' +
          '">' +
        '</div>' +
        '<div class="col-xs-8">' +
          '<p class="restaurant-address">' +
            item[idx].street_address +
          '</p>' +
          '<p class="restaurant-hours">' +
            item[idx].hours +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="row button-row">' +
        '<div class="col-xs-4 col-xs-offset-4">' +
        '<button type="button" class="show-results" onclick="showResults()">' +
          'Results' +
        '</button>' +
        '</div>' +
      '</div>' +
    '</section>'
  );

  showMap();
}

//Shows map on single-results page//
function showMap() {
  L.mapbox.accessToken = 'pk.eyJ1IjoiY2hpYml0b2Z1IiwiYSI6ImNpaXNkYzAycDAzNHZ2NG01Z3MxcmNjZWEifQ.j0WgZ0YRd36GE4cpJ7DxSQ';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([47.609895, -122.330259], 13);
  L.mapbox.featureLayer({
  // this feature is in the GeoJSON format: see geojson.org
  // for the full specification
  type: 'Feature',
  geometry: {
      type: 'Point',
      // coordinates here are in longitude, latitude order because
      // x, y is the standard for GeoJSON and many formats
      coordinates: [
        -122.330259,
        47.609895
      ]
  },
  properties: {
      title: 'Peregrine Espresso',
      description: '1718 14th St NW, Washington, DC',
      'marker-size': 'large',
      'marker-color': '#13983c',
      'marker-symbol': 'restaurant'
  }
  }).addTo(map);

  L.mapbox.featureLayer({
  // this feature is in the GeoJSON format: see geojson.org
  // for the full specification
  type: 'Feature',
  geometry: {
      type: 'Point',
      // coordinates here are in longitude, latitude order because
      // x, y is the standard for GeoJSON and many formats
      coordinates: [
        -122.350259,
        47.619895
      ]
  },
  properties: {
      title: 'Peregrine Espresso',
      description: '1718 14th St NW, Washington, DC',
      'marker-size': 'large',
      'marker-color': '#f1e10c',
      'marker-symbol': 'bus'
  }
  }).addTo(map);
}

//Back button to show results page//
function showResults() {
  $('#single-result').hide();
  $('#results').show();
  console.log('hello');
}

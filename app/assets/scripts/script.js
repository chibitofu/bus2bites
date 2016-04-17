var placesData
var busLoc = {};
var biteLoc = {};

$('#sub-butt').on('click', function(e) {
  e.preventDefault();
  var busRoute = parseInt($('.bus-route').val());

  $.ajax({
    url: 'http://localhost:3000/routes/' + busRoute,
    method: 'GET',
    data: busRoute,
    success: function(data, status) {
      // for(var i = 0; i < data.data.length; i++) {
      //   if (i%2 === 0 || i === 0) {
      //     restaurantsArr.push(data.data[i])
      //   } else {
      //     stopsArr.push(data.data[i]);
      //   }
      // }

      $('#route-form').hide()
      placesData = data.data;
      routeList(placesData);
      console.log(placesData);
    },
    error: function(xhrt, status, error) {
      console.log(status);
    }
  })

});

//Creates a list of restaurants//
function routeList(placesData) {
  var prices = '';
  var rating = '';
  var hours = '';

  //Gets rid of margin on top-bar//
  $('.top-bar').removeClass('bot-mar');

  $('body').css({
    'background-image' : 'none'
  })
  $('#result').html('');
  $('#result').show();
  for(var i = 0; i < placesData.length; i++) {
    var idx = 'restaurant';
    var places = placesData[i][idx];
    var hoursArr = JSON.parse(places.hours);
    var hours = '';
    for (var k = 0; k < hoursArr.length; k++) {
      hours +=
      '<ul>' +
        '<li>' +
          hoursArr[k] +
        '</li>' +
      '</ul>';
    }
    console.log(hours);

    //Creates $$$ for price_level//
    if (places.price_level != null) {
      for (var j = 0; j < places.price_level; j++) {
        prices += '$';
      }
    } else {
      prices = 'NA';
    }

    //Sets rating to NA if null//
    if (places.rating != null) {
      rating = places.rating;
    } else {
      rating = 'NA';
    }

    // for (var k = 0; k < places.hours.length; k++) {
    //   console.log(places.hours[i]);
    // }


    //Generates html element for each restaurant//
    $('#results').append(
      '<section class="restaurants" onclick="restaurantDetail(' +
        i +
        ',' +
        "'" +
        prices +
        "'" +
        ',' +
        "'" +
        rating +
        "'" +
      ')">' +
        '<div class="row restaurant-name">' +
          '<p>' +
            places.name +
            '<span>' +
              prices +
            '</span>' +
          '</p>' +
        '</div>' +
        '<div class="row restaurant-bottom">' +
          '<div class="col-xs-4">' +
            '<img class="img-responsive restaurant-icon" src="' +
              places.icon +
            '">' +
            '<p class="text-center restaurant-rating">' +
            'Rating ' +
            rating +
            '</p>' +
          '</div>' +
          '<div class="col-xs-8">' +
            '<p class="restaurant-address">' +
              places.address +
            '</p>' +
            '<p class="restaurant-hours">' +
              hours +
            '</p>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
    prices = '';
  } //end of i for loop//

}

//Returns one restaurant based on the idx of the item//
function restaurantDetail(idx, prices, rating) {
  var places = placesData[idx]['restaurant'];
  var stop = placesData[idx]['stop'];

  biteLoc = {
      lat: places.lat,
      lng: places.lng
    };

  busLoc = {
      lat: stop.lat,
      lng: stop.lng
    };


  $('#results').hide();
  $('#single-result').show();
  $('#single-result').removeClass('hidden');
  $('.result').html('');
  $('.result').append(
    '<section class="restaurants">' +
      '<div class="row restaurant-name">' +
        '<p>' +
          places.name +
          '<span>' +
            prices +
          '</span>' +
        '</p>' +
      '</div>' +
      '<div class="row">' +
        '<div class="col-xs-4">' +
          '<img class="img-responsive restaurant-icon" src="' +
            places.icon +
          '">' +
          '<p class="text-center restaurant-rating">' +
          'Rating ' +
          rating +
          '</p>' +
        '</div>' +
        '<div class="col-xs-8">' +
          '<p class="restaurant-address">' +
            places.address +
          '</p>' +
          '<p class="restaurant-hours">' +
            places.hours +
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
  var map = new L.mapbox.map('map', 'mapbox.streets')
    .setView([biteLoc.lat, biteLoc.lng], 16);
  L.mapbox.featureLayer({
  // this feature is in the GeoJSON format: see geojson.org
  // for the full specification
  type: 'Feature',
  geometry: {
      type: 'Point',
      // coordinates here are in longitude, latitude order because
      // x, y is the standard for GeoJSON and many formats
      coordinates: [
        biteLoc.lng,
        biteLoc.lat
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
        busLoc.lng,
        busLoc.lat
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
}

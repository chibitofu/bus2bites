var placesData
var busLoc = {};
var biteLoc = {};
var bitePoint;
var busPoint;
var map;

function getDropdownOptions() {
  $.ajax({
    url: 'http://localhost:3000/routes/',
    method: 'GET',
    success: function(data, status) {
      for (var i = 0; i < data.length; i++) {
        $('.bus-route-select').append(
          '<option value="' +
          data[i].short_name +
          '">' +
          data[i].short_name +
          '</option>'
        )
      }
      console.log("yay", data);
    },
    error: function(xhrt, status, error) {
      console.log('boooo', status);
    }
  });
};
getDropdownOptions();

$('#sub-butt').on('click', function(e) {
  e.preventDefault();
  var busRoute = parseInt($('.bus-route').val());

  $.ajax({
    url: 'http://localhost:3000/routes/' + busRoute,
    method: 'GET',
    data: busRoute,
    success: function(data, status) {
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
    var hoursArr = [];
    var hours = '';

    //Generates HTML for hours//
    for (var k = 0; k < hoursArr.length; k++) {
      if (JSON.parse(places.hours)) {
        hours = JSON.parse(places.hours);
      } else {
        hours = [NA];
      }

      hours +=
      '<ul>' +
        '<li>' +
          hoursArr[k] +
        '</li>' +
      '</ul>';
    }

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
        ',' +
        "'" +
        hours +
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
function restaurantDetail(idx, prices, rating, hours) {
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
            hours +
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
      '<p class="text-center bus-stop-name">' +
        'Bus Stop ' +
        stop.name +
      '</p>' +
    '</section>'
  );
  showMap(idx);

}

//Shows map on single-results page//
function showMap(idx) {
  if (map) {
    map.remove();
  }
  $('.map-remover').removeAttr('id');
  $('.map-remover').attr('id', 'map');

  L.mapbox.accessToken = 'pk.eyJ1IjoiY2hpYml0b2Z1IiwiYSI6ImNpaXNkYzAycDAzNHZ2NG01Z3MxcmNjZWEifQ.j0WgZ0YRd36GE4cpJ7DxSQ';

  map = L.mapbox.map('map', 'mapbox.streets', {
    scrollWheelZoom: false,
    scrollZoom: false
  }).setView([biteLoc.lat, biteLoc.lng], 16);

  bitePoint = L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
          type: 'Point',
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
    });

  busPoint = L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
          type: 'Point',
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
    });

    bitePoint.addTo(map);
    busPoint.addTo(map);
}

//Back button to show results page//
function showResults() {
  busLoc = {};
  biteLoc = {};
  $('#single-result').hide();
  $('#results').show();
}

$(document).ready(function() {
  //Gets geolocation of user//
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }

  //Sets geolocation to userLoc variable//
  function setPosition(position) {
    userLoc = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }

  getLocation();
});

//Set to a default value in case no user location can be gotten//
var userLoc = {lat: 47.6062, lng: -122.3321};

var placesData
var busLoc = {};
var biteLoc = {};
var bitePoint;
var busPoint;
var map;
var address;

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

  //Loops through all the data and creates elements for each//
  for(var i = 0; i < placesData.length; i++) {
    var idx = 'restaurant';
    var places = placesData[i][idx];
    var hoursArr = [];
    var hours = '';

    //Generates HTML for hours//
    if (places.hours != 'None') {
      hoursArr = JSON.parse(places.hours);
      for (var k = 0; k < hoursArr.length; k++) {
        hours +=
        '<ul>' +
          '<li>' +
            hoursArr[k] +
          '</li>' +
        '</ul>';
      }
    } else {
      hours = '';
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
      //Creates a onclick function passing through i, prices, rating, and hours//
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

    //Resets price//
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

  //Generates HTML elements for a single restaurant//
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
        '<div class="col-xs-12 col-md-12 text-center">' +
        '<button type="button" class="show-results" onclick="showResults()">' +
          'Results' +
        '</button>' +
        '<button type="button" class="bus-zoom">' +
          'Bus Stop' +
        '</button>' +
        '<button type="button" class="zoom-out">' +
          'Zoom Out' +
        '</button>' +
        '</div>' +
      '</div>' +
      '<p class="text-center bus-stop-name">' +
        'Bus Stop ' +
        stop.name +
      '</p>' +
    '</section>'
  );
  getRevGeo(idx);

}

function getRevGeo(idx) {
  var latlng = new google.maps.LatLng(userLoc.lat, userLoc.lng);
    //This is making the Geocode request//
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        //This is checking to see if the Geoeode Status is OK before proceeding//
        if (status == google.maps.GeocoderStatus.OK) {
            address = results[1].formatted_address;
            showMap(idx);
        }
    });
}

//Shows map on single-results page//
function showMap(idx) {
  var places = placesData[idx];

  //Gets rid of current map if one exists//
  if (map) {
    map.remove();
  }

  //Map accessToken//
  L.mapbox.accessToken = 'pk.eyJ1IjoiY2hpYml0b2Z1IiwiYSI6ImNpaXNkYzAycDAzNHZ2NG01Z3MxcmNjZWEifQ.j0WgZ0YRd36GE4cpJ7DxSQ';

  //Creates the map//
  map = L.mapbox.map('map', 'mapbox.streets', {
    scrollWheelZoom: false,
    scrollZoom: false
  }).setView([biteLoc.lat, biteLoc.lng], 16);

  //User Restaurant and Bus locations//
  var geojson = [
    {
      "type": 'Feature',
      "geometry": {
          "type": 'Point',
          "coordinates": [
            userLoc.lng,
            userLoc.lat
          ]
      },
      "properties": {
          "title": 'Current Location',
          "description": address,
          'marker-size': 'large',
          'marker-color': '#0c91f1',
          'marker-symbol': 'mobilephone'
      }
    },
    {
      "type": 'Feature',
      "geometry": {
          "type": 'Point',
          "coordinates": [
            busLoc.lng,
            busLoc.lat
          ]
      },
      "properties": {
          "title": 'Bus Stop',
          "description": places.stop.name,
          'marker-size': 'large',
          'marker-color': '#f1e10c',
          'marker-symbol': 'bus'
      }
    },
    {
      "type": 'Feature',
      "geometry": {
          "type": 'Point',
          "coordinates": [
            biteLoc.lng,
            biteLoc.lat
          ]
      },
      "properties": {
          "title": places.restaurant.name,
          "description": places.restaurant.address,
          'marker-size': 'large',
          'marker-color': '#13983c',
          'marker-symbol': 'restaurant'
      }
    }
  ];

  //Creates a feature layer with all the points from the geojson//
  var Poi = L.mapbox.featureLayer().setGeoJSON(geojson);

  //Adds feature layer to map//
  Poi.addTo(map);

  //Sets the map zoom and center to fit all points on the feature layer//
  map.fitBounds(Poi.getBounds());

  //Zooms in on bus stop when button is slicked//
  $('.bus-zoom').on('click', function() {
    map.setView([busLoc.lat, busLoc.lng], 15);
  });

  //Zooms out to show all points when button is clicked//
  $('.zoom-out').on('click', function() {
    map.fitBounds(Poi.getBounds());
  });

}

//Back button to show results page//
function showResults() {
  busLoc = {};
  biteLoc = {};
  $('#single-result').hide();
  $('#results').show();
}

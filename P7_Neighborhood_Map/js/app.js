var unionSquare = {
  name: 'Union Square',
  address: '333 Post St, San Francisco, CA 94108',
  position: {lat: 37.7879938, lng: -122.40743739999999},
  marker: undefined
};

var initialLocations = [
  {name: 'Zero Zero',
   address: '826 Folsom St, San Francisco, CA 94107',
   position: {lat: 37.7816394, lng: -122.40205679999997},
   marker: undefined
  },
  {name: 'Fly Bar & Restaurant',
   address: '1085 Sutter St, San Francisco, CA 94109',
   position: {lat: 37.7878642, lng: -122.41823799999997},
   marker: undefined
  },
  {name: 'Uncle Vito\'s',
   address: '700 Bush St, San Francisco, CA 94108',
   position: {lat: 37.7903112, lng: -122.40896650000002},
   marker: undefined
  },
  {name: 'Chicos Pizz',
   address: '131 6th St, San Francisco, CA 94103',
   position: {lat: 37.780747, lng: -122.4081357},
   marker: undefined
  },
  {name: 'Piccolo Italia Pizza',
   address: '799 O\'Farrell St, San Francisco, CA 94109',
   position: {lat: 37.7849982, lng: -122.41764519999998},
   marker: undefined
  }
];

var infoWinTemp = "<div><b>Foursquare:</b><br /><a href='${shortUrl}' target='_blank'>${name}</a><br />${address}<br />${phone}</div>";
var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search';
var fourSquareVenueUrl = 'https://api.foursquare.com/v2/venues';
var fourSquare = {
  client_id: 'QLLKNWEOGG5SLZR4NUNZMF3ERM3MXAY0AEPXUVND4VOYPQUE',
  client_secret: 'QCBYIZPBBK4SBJNUSJ2QMA3WMXTMXSN1JA0BRZ5MRHEUZZPH',
  v: '20140806',
  m: 'foursquare',
  limit: 1
};

/*
  geocodeAddress is the method to get lat, lng for the given address.
  This is not used by the final site.
*/
var geocodeAddress = function(geocoder, resultsMap) {
  var callback = function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      console.log(results[0].formatted_address);
      console.log("position: {lat: " + results[0].geometry.location.lat() +
        ", lng: " + results[0].geometry.location.lng() + "}");
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  };
  for (var i = 0; i < initialLocations.length; i++) {
    geocoder.geocode({'address': initialLocations[i].address}, callback);
  }
};

/**
Place model. While Google Map's Marker is sufficient for most of cases, address
can't be stored with Marker class. visibility is added as observable so
view gets refreshed when placeList is updated.
*/
var Place = function(data) {
  var self = this;
  this.address = data.address;
  this.marker = data.marker;
  this.visibility = ko.observable(true);
};
var map;
var ViewModel = function() {
  var self = this;
  this.infowindow = new google.maps.InfoWindow({
  });
  this.placeList = ko.observableArray([]);
  var initialize = function() {
    initialLocations.forEach(function(place) {
      var p = new Place(place);
      var marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.position,
        visibility: true
      });
      p.marker = marker;
      marker.addListener('click', function() {
        self.setCurrentLocation(p);
      });
      var foursquareQuery = {
        ll: marker.position.lat() + "," + marker.position.lng(),
        query: marker.title
      };
      /**
      Foursqure venue search API returns the list of venues without phone number
      and URL. This calls search API to get venueId. Then, it stores it in
      place.
      */
      $.extend(foursquareQuery, fourSquare, foursquareQuery);
      $.ajax({
        url: fourSquareUrl,
        data: foursquareQuery
      }).done(function(res) {
        p.foursqVenueId = res.response.venues[0].id;
      }).fail(function(res) {
          console.log(res);
          $("#message").html("Foursqure Search API is not working. There won't be any additional information in information window.");
      });
      self.placeList.push(p);
    });
  };
  initialize();
  this.currentLocation = ko.observable(self.placeList()[0]);
  this.setCurrentLocation = function(data) {
      $("#message").html();
      self.currentLocation().marker.setAnimation(null);
      self.currentLocation(data);
      self.currentLocation().marker.setAnimation(google.maps.Animation.BOUNCE);
      map.panTo(data.marker.position);
      $.ajax({
        url: fourSquareVenueUrl + "/" + data.foursqVenueId,
        data: fourSquare
      }).done(function(res) {
        var content = infoWinTemp;
        content = content.replace("\$\{shortUrl\}",
          res.response.venue.shortUrl);
        content = content.replace("\$\{name\}", res.response.venue.name);
        content = content.replace("\$\{address\}",
          res.response.venue.location.formattedAddress[0]);
        content = content.replace("\$\{phone\}",
          res.response.venue.contact.formattedPhone);
        self.infowindow.setContent(content);
        self.infowindow.open(data.marker.get('map'), data.marker);
      }).fail(function(res) {
        console.log(res);
        $("#message").html("Foursqure API failed. No additional information for  " + data.marker.title);
      });
      window.setTimeout(function() {
        self.currentLocation().marker.setAnimation(null);
      }, 2048);
  };
  this.filter = ko.observable();
  this.filterList = function(data) {
    self.placeList().forEach(function(place) {
      if (self.filter() === undefined || self.filter().trim().length === 0) {
        place.marker.visibility = true;
        place.visibility(true);
        place.marker.setMap(map);
      } else if (place.marker.title.toLowerCase().includes(
        self.filter().toLowerCase()) ||
        place.address.toLowerCase().includes(self.filter().toLowerCase())) {
        place.marker.visibility = true;
        place.visibility(true);
        place.marker.setMap(map);
      } else {
        place.marker.visibility = false;
        place.visibility(false);
        place.marker.setMap(null);
      }
    });
  };
};

var initMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: unionSquare.position,
    zoom: 14
  });
  ko.applyBindings(new ViewModel());
};

var mapError = function() {
  $("#message").html("Google Map API failed!!");
};

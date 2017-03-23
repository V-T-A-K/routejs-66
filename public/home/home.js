angular.module('mapApp.home', ['gm','four-tour-svcs'])

.controller('homeCtrl', function($rootScope, $scope, $location, $http, mapping) {

	$scope.locating = false;
	$scope.pulldownDefault = {name: 'Choose a category'};
	$scope.chosenCategory = $scope.pulldownDefault;
	$scope.categories = [{name: "Coffee", catId: "4bf58dd8d48988d1e0931735"},
											{name: "Bakeries", catId: "4bf58dd8d48988d16a941735"},
											{name: "Booze",catId: "4bf58dd8d48988d116941735"},
											// {name: "Food", catId: "4d4b7105d754a06374d81259"},
											{name: "Fun", catId: "4d4b7104d754a06370d81259"},
											{name: "Threads", catId: "4bf58dd8d48988d103951735"},
											{name: "History", catId: "4deefb944765f83613cdba6e"}];



	$scope.chooseCategory = function(category) {
  	$scope.chosenCategory = category;
  }

  $scope.geoLocate = function() {
  	$scope.locating = true;
  	if ($rootScope.located) {
  		setTimeout(function() {
  			$scope.origin = $rootScope.origin;
  			$rootScope.useGeo = true;
  			$scope.locating = false;
    		$scope.$apply();
  		}, 1750);
  	} else {
  		// console.log('RECURSION!!!');
    	setTimeout($scope.geoLocate, 500);
    }
    console.log('GEOLOCATE ORIGIN = ', $rootScope.origin);
  };

  // $scope.originScreener = function() {
  // 	if ($rootScope.useGeo) {
  // 		$scope.getTour();
  // 	} else {
  // 		$rootScope.origin = $scope.origin;
  // 		mapping.latLngFinder($scope.origin, function() {
  // 			console.log('FINISHED LATLNGFINDER CALL IN HOME.JS');
  // 		});
  // 		$scope.getTour();
  // 	}
  // }

  $scope.getTour = function() {
  	$rootScope.chosenCategoryId = $scope.chosenCategory.catId;
  	if(!$rootScope.origin || $scope.chosenCategory.name === "Choose a category") {
  		alert('Please make sure you have chosen a starting point and category');
  	} else {
  		if (!$rootScope.useGeo) {
				$rootScope.coords.lat = $rootScope.origin.lat();
        $rootScope.coords.lng = $rootScope.origin.lng();
  		}
  		$location.path('/map');
  	}
  };

  $scope.reset = function() {
  	$scope.origin = '';
  	$rootScope.origin = $rootScope.user;
  	$scope.chosenCategory = $scope.pulldownDefault;
  };

	$scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      $rootScope.origin = $scope.origin.getPlace().geometry.location;
      console.log('AUTOCOMPLETE ORIGIN = ', $rootScope.origin);
      console.log('ORIGIN.LAT = ', $rootScope.origin.lat());
      // var dest = $scope.destination.getPlace().geometry.location;
      // $rootScope.origin.lat = origin.lat();
      // $rootScope.origin.lng = origin.lng();
      // $rootScope.destination.lat = dest.lat();
      // $rootScope.destination.lng = dest.lng();
	});

})




/*function fsSearch(position, map) {
    $scope.fsState = 'loading';

    // sets location based on entered location or Geolocation
    var latitude;
    var longitude;
    if($rootScope.address === undefined){
      latitude = position.lat;
      longitude = position.lng;
    } else {
      latitude = $rootScope.lat;
      longitude = $rootScope.lng;
    }
    var data = {"latitude": latitude, "longitude": longitude}
    $http.post('/api/foursquare', data)
      .then(function(result, status) {
        var fsPlaces = result.data.response.groups[0].items;
        var fsPlacesLatLng = [];
        fsPlaces.forEach(function(place) {
          fsPlacesLatLng.push(
            {
              location: {
                lat: place.venue.location.lat,
                lng: place.venue.location.lng
              },
              stopover: true
            }
          );
        });
        $scope.fsState = 'loaded';
        //the start and end is based on position which is the current location position not entered
        drawTour(position, map, fsPlacesLatLng);
      }, function(data, status) {
        $scope.fsState = 'noResult';
      });
  };*/
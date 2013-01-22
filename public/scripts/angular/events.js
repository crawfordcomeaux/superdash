angular.module('events', ['events.filters', 'events.services', 'events.directives', 'ui']);

function EventsCtrl($scope, $http) {
    $scope.events = [];

  	$http({method: 'GET', url: '/superdash/events'}).
    success(function(data, status, headers, config) {
    	console.log('events = ' + data.events)
      $scope.events = data.events;
    })
}

angular.module('events.directives', []).
    directive('appVersion', ['version', function(version) {
	return function(scope, el, attrs) {
	    el.text(version);
	};
    }]);

angular.module('events.filters', []).
    filter('interpolate', ['version', function(version) {
	return function(text) {
	    return String(text).replace(/\%VERSION\%/mg, version);
	};
    }]);

angular.module('events.services', []).
    value('version', '0.1');

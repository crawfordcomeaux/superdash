angular.module('events', ['events.filters', 'events.services', 'events.directives', 'ui']);

function EventsCtrl($scope, $http) {
    $scope.events = [];

    var socket = io.connect('/events');
    socket.on('events', function (data) {
    	console.log('data = ' + data)
	$scope.events.splice(0, 0, data);
	if($scope.events.length > 6) {
	    $scope.events.pop();
	}
	$scope.$apply();
    });
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

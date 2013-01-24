angular.module('events', ['events.filters', 'events.services', 'events.directives', 'ui']);

function EventsCtrl($scope, $http) {
    $scope.events = [];

    var socket = io.connect('/events');
    socket.on('events', function (data) {
    	console.log('data = ' + data);
	$scope.events.splice(0, 0, data);
	if($scope.events.length > 6) {
	    $scope.events.pop();
	}
	$scope.$apply();
    });
}

angular.module('events.directives', []);

angular.module('events.filters', []);

angular.module('events.services', []);


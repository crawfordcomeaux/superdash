angular.module('psa', ['psa.filters', 'psa.services', 'psa.directives', 'ui']);

function PsaCtrl($scope) {
    $scope.tweets = [];

    var socket = io.connect('/psa');
    socket.on('psa-tweet', function (data) {
	$scope.tweets.splice(0, 0, data);
	if($scope.tweets.length > 6) {
	    $scope.tweets.pop();
	}
	$scope.$apply();
    });
}

angular.module('psa.directives', []).
    directive('appVersion', ['version', function(version) {
	return function(scope, el, attrs) {
	    el.text(version);
	};
    }]);

angular.module('psa.filters', []).
    filter('interpolate', ['version', function(version) {
	return function(text) {
	    return String(text).replace(/\%VERSION\%/mg, version);
	};
    }]);

angular.module('psa.services', []).
    value('version', '0.1');

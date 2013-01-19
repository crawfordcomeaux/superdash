angular.module('nola-tweets', ['nola-tweets.filters', 'nola-tweets.services', 'nola-tweets.directives']);

function MyCtrl($scope) {
    $scope.value = 42;
}

angular.module('nola-tweets.directives', []).
    directive('appVersion', ['version', function(version) {
	return function(scope, el, attrs) {
	    el.text(version);
	};
    }]);

angular.module('nola-tweets.filters', []).
    filter('interpolate', ['version', function(version) {
	return function(text) {
	    return String(text).replace(/\%VERSION\%/mg, version);
	};
    }]);

angular.module('nola-tweets.services', []).
    value('version', '0.1');
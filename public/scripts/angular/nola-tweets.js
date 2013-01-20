angular.module('nola-tweets', ['nola-tweets.filters', 'nola-tweets.services', 'nola-tweets.directives']);

function NolaTweetsCtrl($scope) {
    $scope.tweets = [
	{
	    id: 2,
	    name: 'Test',
	    screen_name: 'test1',
	    text: 'this is a test tweet 3',
	    thumbnail: 'http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png',
	    time: Date.now()+2
	},
	{
	    id: 1,
	    name: 'Test',
	    screen_name: 'test1',
	    text: 'this is a test tweet 2',
	    thumbnail: 'http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png',
	    time: Date.now()+1
	},
	{
	    id: 0,
	    name: 'Test',
	    screen_name: 'test1',
	    text: 'this is a test tweet 1',
	    thumbnail: 'http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png',
	    time: Date.now()
	}];

    var socket = io.connect('http://localhost:3001');
    socket.on('nola-tweet', function (data) {
	$scope.tweets.splice(0, 0, data);
	if($scope.tweets.length > 10) {
	    $scope.tweets.pop();
	}
	$scope.$apply();
    });
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
angular.module('nola-tweets', ['nola-tweets.filters', 'nola-tweets.services', 'nola-tweets.directives', 'ui']);

function NolaTweetsCtrl($scope) {
    $scope.tweets = [];

    var socket = io.connect('/nolatweets');
    socket.on('tweet', function (data) {
	$scope.tweets.splice(0, 0, data);
	if($scope.tweets.length > 6) {
	    $scope.tweets.pop();
	}
	$scope.$apply();
    });

    socket.on('tweet-hide', function(id) {
	for(var i in $scope.tweets) {
	    var tweet = $scope.tweets[i];
	    
	    if(tweet.id == id) {
		$scope.tweets.splice(i, 1);
		$scope.$apply();
		break;
	    }
	}
    });

    $scope.hideTweet = function(id) {
	for(var i in $scope.tweets) {
	    var tweet = $scope.tweets[i];
	    
	    if(tweet.id == id) {
		$scope.tweets.splice(i, 1);
		$scope.$apply();
		break;
	    }
	}

	socket.emit('tweet-hide', id);
    };
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
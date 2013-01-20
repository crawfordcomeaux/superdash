var twitter = require('ntwitter'),
    io = require('socket.io').listen(3001);

var screenNames = [
    'superdashtest3',
    'superdashtest4'
];

var twit = new twitter({
    consumer_key: '7djKbTtC2jEU9IACpDtztg',
    consumer_secret: 'Oqh4o2ef4cNySPJ5OI3ytnFg6mwN1vFbvAdb7QsIw',
    access_token_key: '774653509-8IOsWCx7CSZEw15VOOuxmU4FuG75NpXVs0HHw0r2',
    access_token_secret: '0e6I5gCIddg5I90dJwYVaYo9vnS1qV2UpQ0tWqTY'
});

var userIDs = [];

twit
    .verifyCredentials(function (err, data) {
	if(err)
	    console.log('Error: ' + err);
    })
    .showUser(screenNames.join(','), function(err, data) {
	for(var i in data) {
	    userIDs.push(data[i].id_str);
	}

	stream();
    });

var id = 0;
var log = [];

function stream() {
    twit.stream('statuses/filter', {'follow': userIDs.join(',')}, function(stream) {
	stream.on('data', function(data) {
	    if(data.user) {
		var tweet = {
		    id: ++id,
		    name: data.user.name,
		    screen_name: data.user.screen_name,
		    text: data.text,
		    thumbnail: data.user.profile_image_url,
		    time: Date.now()
		};

		io.sockets.emit('nola-tweet', tweet);

		log.push(tweet);

		console.log(tweet);

		/*console.log(id + '. ' + data.user.name + ' - @' + data.user.screen_name);
		console.log('    ' + data.text + '\n');*/
	    }
	});

	stream.on('end', function() {
	    console.log('end');
	});

	stream.on('error', function(err, data) {
	    console.log(err + ': ' + data);
	});
    });
}

io.sockets.on('connection', function (socket) {
    console.log('connection');
});
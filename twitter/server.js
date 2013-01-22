var twitter = require('ntwitter'),
    events = require('../models/events');

exports.listen = function(server) {
    var io = require('socket.io').listen(server);

    var userIDs = [
	'1072729021',
	'1104932480'
    ];

    var twit = new twitter({
	consumer_key: '7djKbTtC2jEU9IACpDtztg',
	consumer_secret: 'Oqh4o2ef4cNySPJ5OI3ytnFg6mwN1vFbvAdb7QsIw',
	access_token_key: '774653509-8IOsWCx7CSZEw15VOOuxmU4FuG75NpXVs0HHw0r2',
	access_token_secret: '0e6I5gCIddg5I90dJwYVaYo9vnS1qV2UpQ0tWqTY'
    });

    stream();

    var id = 0;
    console.log(userIDs);

    /*var log = [];*/
    function stream() {
    	console.log(userIDs);
	twit.stream('statuses/filter', {'follow': userIDs.join(',')}, function(stream) {
	    stream.on('data', function(data) {
		if(data.user) {
		    var tweet = {
			id: ++id,
			status_id: data.id,
			name: data.user.name,
			user_id: data.user.id,
			screen_name: data.user.screen_name,
			text: data.text,
			thumbnail: data.user.profile_image_url,
			timestamp: data.created_at,
			replying_to_status_id: data.in_reply_to_status_id,
			replying_to_user_id: data.in_reply_to_user_id,
			replying_to_screen_name: data.in_reply_to_screen_name
		    };

		    io.of('/nolatweets').emit('tweet', tweet);
		    
		    if(tweet.text.toLowerCase().indexOf('#psa') != -1) {
			io.of('/psa').emit('tweet', tweet);
		    }
		}
	    });

	    stream.on('end', function() {
		console.log('Twitter stream closed');
	    });

	    stream.on('error', function(err, data) {
		console.log(err + ': ' + data);
	    });
	});
    }

    io.of('/nolatweets').on('connection', function(socket) {
	socket.on('tweet-hide', function(id) {
	    socket.broadcast.emit('tweet-hide', id);
	});
    });

    io.sockets.on('connection', function (socket) {
	console.log('connection');
    });

    /*setInterval(function() {
	console.log('emit');
	io.of('/psa').emit('psa-tweet', {
	    id: ++id,
	    name: 'Test',
	    screen_name: 'test1',
	    text: 'this is a test tweet ' + id + ' #PSA',
	    thumbnail: 'http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png',
	    time: Date.now()
	});
    }, 5000);*/

    setInterval(function() {
	var tweet = {
	    id: ++id,
	    name: 'Charlie Chaplin',
	    user_id: '10001',
	    screen_name: 'greatestleader',
	    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	    thumbnail: 'http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png',
	    timestamp: Date.now()
	};

	io.of('/nolatweets').emit('nola-tweet', tweet);
    }, 10000);


    var query = events.find();
    query.exec(function(error, doc){
	//console.log(doc.length);
	for(i=0; i<doc.length; i++){
	    setInterval(function() {
		//console.log(doc[i]);
		io.of('/events').emit('events', doc[i]);
	    }, 5000);
	}
	// do something with the mongoose document
    }).on('error', function (err) {
	// handle the error
    }).on('close', function () {
	// the stream is closed
    });

}

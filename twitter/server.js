var twitter = require('ntwitter'),
    MyEvent = require('../models/events'),
    Tweet = require('../models/tweet');

exports.listen = function(server) {
    var io = require('socket.io').listen(server);
    
    var userIDs = [
	'1072729021',
	'1104932480','1367531','14523894','16819278','17831966','15600217','16494601','14164855','17685196','16181186','10202','807095','8453452','171317482','26642006','14293310','14079425'
    ];

    var twit = new twitter({
	consumer_key: '7djKbTtC2jEU9IACpDtztg',
	consumer_secret: 'Oqh4o2ef4cNySPJ5OI3ytnFg6mwN1vFbvAdb7QsIw',
	access_token_key: '774653509-8IOsWCx7CSZEw15VOOuxmU4FuG75NpXVs0HHw0r2',
	access_token_secret: '0e6I5gCIddg5I90dJwYVaYo9vnS1qV2UpQ0tWqTY'
    });


    var id = 0;

    /*var log = [];*/
   
    var eventSocket = io.of('/events');
    stream();
    function stream() {
	twit.stream('statuses/filter', {'follow': userIDs.join(',')}, function(stream) {
	    stream.on('data', function(data) {
		if(data.user) {
		    var tweet = {
			status_id: data.id,
			name: data.user.name,
			user_id: data.user.id,
			screen_name: data.user.screen_name,
			text: data.text,
			profile_image_url: data.user.profile_image_url,
			created_at: data.created_at,
			in_reply_to_status_id: data.in_reply_to_status_id,
			in_reply_to_user_id: data.in_reply_to_user_id,
			in_reply_to_screen_name: data.in_reply_to_screen_name,
			msgtype: 'general',
			hidden: false
		    };

		    routeTweet(tweet);
		}
	    });

	    stream.on('end', function() {
		console.log('Twitter stream closed');
	    });

	    stream.on('error', function(err, data) {
		console.log('Twitter stream error. '); // err + ': ' + data);
	    });
	});
    }

    function routeTweet(tweet) {
	var patt = new RegExp("^@" + tweet.screen_name);

	console.log('routeTweet');
	console.log(tweet.user_id);
	console.log(userIDs);
	if(tweet.text.toLowerCase().indexOf('#psa') != -1) {
	    io.of('/psa').emit('tweet', tweet);
	    tweet.msgtype = 'psa';
	    tweet.save();
	    console.log('psa');
	} else if(userIDs.indexOf(tweet.user_id.toString()) != -1) {  		// If followed account tweets 
	    console.log('followed');
	    if(userIDs.indexOf(tweet.in_reply_to_user_id) == -1) { 	// To a non-followed account
		var orig = twit.getStatus(tweet.in_reply_to_status_id);
		console.log(orig);
		if (patt.test(orig.data.text) == false) {			// And it's in response to a tweet
		    io.of('/nolacares').emit('tweetpair', {'original': orig, 'response' : tweet});		// that wasn't to the followed account
		    console.log('tweet pair');
		} else {
		    console.log('tweet');
		    io.of('/nolatweets').emit('tweet', tweet);
		}
            }
	} else {
	    console.log('not followed');
            if(userIDs.indexOf(tweet.in_reply_to_user_id) != -1) {	// above to find people responding
		var orig = twit.getStatus(tweet.in_reply_to_status_id);    // to NOLA
		if (patt.test(orig.data.text) == false) {
		    io.of('/nolacares').emit('tweetpair', {'original': orig, 'response' : tweet});		
		}
            }
	    console.log('tweet pair');
	} 
    } 
   
    io.of('/nolatweets').on('connection', function(socket) {
	socket.on('tweet-hide', function(id) {
	    socket.broadcast.emit('tweet-hide', id);
	});
    });



/*    io.sockets.on('connection', function (socket) {
//	console.log('connection');
    });

    setInterval(function() {
	var tweet = {
	    id: ++id,
	    name: 'Charlie Chaplin',
	    user_id: '10001',
	    screen_name: 'greatestleader',
	    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ' + id,
	    thumbnail: 'http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png',
	    timestamp: Date.now()
	};

	io.of('/nolatweets').emit('tweet', tweet);
    }, 10000); */

   eventSocket.on('connection', function(socket) {
//	eventSocket.emit('events',events);
		//TODO: call events.findAll() and emit	
   });


    setInterval(function() {
	var query = MyEvent.find();
	query.exec(function(error, docs){
	    io.of('/events').emit('events', docs);
	});
    }, 5000);

};

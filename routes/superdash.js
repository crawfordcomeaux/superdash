var util = require('util');
var config = require('../config');
var events = require('../models/events');
var tweets = require('../models/tweets');
var Ntwitter = require('ntwitter');
var Instagram = require('instagram-node-lib');


var twit = new Ntwitter(config.twitter);
Instagram.set('client_id', config.instagram.client_id);
Instagram.set('client_secret', config.instagram.client_secret);
Instagram.set('callback_url', config.root + config.instagram.callback_url);


exports.events = function(req, res) {
	var events = [];
	var count = events.count({}, function() {});
	var stream = events.find().stream();

	stream.on('data', function (data) {
		events.push({
      venue: data.venue,
      date: data.date,
      title: data.title,
      start_time: data.start_time,
      end_time: data.end_time
		});
	});

	stream.on('error', function (err) {
		console.log("Events stream error: %s", err);
	});

	stream.on('close', function () {
		if (count != events.length) {
			console.log("Warning: event collection count not equal to # of events returned.");
			console.log("- Count: %d | Events returned: %d", count, events.length);
		}

		res.contentType('json');
		res.send({ 'events': events });
	});
};


exports.instagram_callback = function (req, res) {
  Instagram.subscriptions.handshake(req, res);
};


exports.instagram_callback_post = function (req, res) {
	req.body.forEach(function (notification) {
		instagram_recent(notification);
	});
};
function instagram_recent (notification) {
	Instagram.InstagramGeographies.recent ({
		geography_id: notification.object_id,
		complete: instagram_complete,
		error: instagraon_error
	});
}
function instagram_complete (data, pagination) {
	console.log("Instagram Data");
	console.log("----------");
	console.log("data: %s", util.inspect(data));
	console.log("pagination: %s", util.inspect(pagination));
}
function instagraon_error (errorMessage, errorObject, caller) {
	console.error("Instagram Error");
	console.error("----------");
	console.error("errorMessage: %s", errorMessage);
	console.error("errorObject: %s", util.inspect(errorObject));
	console.error("caller: %s", util.inspect(caller));
}


exports.instagram = function(req, res) {
	var images = [];
	Instagram.media.search({
		lat: 29.9509,
		lng: -90.0814,
		complete: function (data) {
			for (i = 0; i < 3; i++){
				images.push({ 'image': data[i].images.standard_resolution.url });
			}
			res.contentType('json');
			res.send({ url: images });
    },
		error: instagraon_error
	});
};


exports.heatmap = function (req, res) {
	twit.stream('search/tweets', {
		geocode: '29.951462,-90.081053,20mi',
		result_type: 'recent',
		include_entities: false
	}, function (stream) {

		stream.on('data', function (data) {
			for(i = 0; i < data.statuses.length; i++){
				item = data.statuses[i];
			}
			res.contentType('json');
			res.send({ object: data });
		});

    stream.on('error', function (err, data) {
      console.log('Twitter stream error: ' + err + ': ' + data);
    });
	});
};


exports.psa = function (req, res) {
};


exports.changes = function (req, res) {
};


exports.accountfeed = function (req, res) {
};

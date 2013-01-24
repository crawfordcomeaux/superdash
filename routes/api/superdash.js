  var mongoose = require('mongoose')
    , events = require('../../models/events')
    , tweets = require('../../models/tweets')
  	, Twit = require('twit') 
  	, Instagram = require('instagram-node-lib')
	, config = require('../../config/development')
	, https = require('https')
	, util = require('util)');


var twit = new Twit({
    consumer_key:         'Ak2dsjQhvYtsiJ343Q'
  , consumer_secret:      'iuh6rHrlfY7qDnhWMctDCuR4J67N1vOOVq3jL5YVQ'
  , access_token:         '16586793-rBtnLLXcQ8wt5gBjP99SFUrtKiSSRCg3uN3PdIpaR'
  , access_token_secret:  'iMMjANsVy9DvrB53dd5LQvH4nzU05X0djo5mmuUw'
});



Instagram.set('client_id', config.instagram.clientID);
Instagram.set('client_secret', config.instagram.clientSecret);
Instagram.set('callback_url', config.baseURL + 'instagram/callback');



exports.events = function(req, res) {
	var venues = [];
	var query = events.find({});
	query.exec(function(error, docs){
		for(i=0; i<docs.length; i++){
			var venue = docs[i]

			var myvenue = {
				  venue: venue.venue
				, date: venue.date
				, title: venue.title
				, start_time: venue.start_time
				, end_time: venue.end_time
			}

			venues.push(myvenue)
		}

		res.contentType('json');
		res.send({ events: docs });
	});
};


exports.instagram.subscribe_callback = function(req,res) {
  Instagram.subscriptions.handshake(req, res);
};

exports.instagram.callback = function(req, res) {
	req.body.forEach(function(notification){
		instagram_recent(notification);
	});		
};

function instagram_recent(notification) {
	Instagram.InstagramGeographies.recent({
		geography_id: notification.object_id,
		complete: instagram_complete, 
		error: instagraon_error});
}

function instagram_complete(data, pagination) {
	console.log("Instagram Data");
	console.log("---------");
	console.log("data: %s", util.inspect(data));
	console.log("pagination: %s", util.inspect(pagination));
};

function instagraon_error(errorMessage, errorObject, caller) {
	console.log("Instagram Error");
	console.log("---------");
	console.log("errorMessage: %s", errorMessage);
	console.log("errorObject: %s", util.inspect(errorObject));
	console.log("caller: %s", util.inspect(caller));

};

exports.instagram = function(req, res) {
	var images = [];
	console.log('in instagram')
	Instagram.media.search({ 
		lat: 29.9509, lng: -90.0814, 
		complete: function(data){
			for(i=0; i<3; i++){
				var image = data[i]
				var myimage = {
					image: image.images.standard_resolution.url
				}
				images.push(myimage)
			}
		console.log(images)
		res.contentType('json');
		res.send({ url: images });
    	},
    	error: function(errorMessage, errorObject, caller){
     		if(errorMessage){console.log(errorMessage)}
     		if(errorObject){console.log(errorObject)}
     		if(caller){console.log(caller)}	

         }		
	})
};


/*

exports.official = function(req, res) {

	twit.get('lists/statuses', { list_id: '83856674', include_rts: false },  function (err, data) {
		if(err){console.log(err)}
		var lists = [];
		for(i=0; i<data.length; i++){
			var official = data[i]
			var list = {
				text:  official.text,
				name:  official.user.screen_name,
				image: official.user.profile_image_url 
			}
			lists.push(list);
		}
	 
		res.contentType('json');
		res.send({ lists: lists }); 
	})


};
*/


exports.heatmap = function(req, res) {
	twit.get('search/tweets', { 
		  geocode: '29.951462,-90.081053,20mi'
		, result_type: 'recent'
		, include_entities: false
		}, function (err, data) {
		    if(err)
			console.log(err);

		    if(data) {
			for(i=0; i<data.statuses.length; i++){
			    item = data.statuses[i];
			}

			res.contentType('json');
			res.send({ object: data }); 
		    }
		});

};



exports.psa = function(req, res) {

};



exports.changes = function(req, res) {

};



exports.accountfeed = function(req, res) {

};

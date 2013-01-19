  var mongoose = require('mongoose')
    , events = require('../../models/events')
    , tweets = require('../../models/tweets')
  	, Twit = require('twit')  


var twit = new Twit({
    consumer_key:         'Ak2dsjQhvYtsiJ343Q'
  , consumer_secret:      'iuh6rHrlfY7qDnhWMctDCuR4J67N1vOOVq3jL5YVQ'
  , access_token:         '16586793-rBtnLLXcQ8wt5gBjP99SFUrtKiSSRCg3uN3PdIpaR'
  , access_token_secret:  'iMMjANsVy9DvrB53dd5LQvH4nzU05X0djo5mmuUw'
});




exports.events = function(req, res) {
	var count = 10;
	var venues = [];
	var query = events.find({});
	query.exec(function(error, docs){
		for(i=0; i<docs.length; i++){
			var venue = docs[i]
			console.log(venue.venue);
			console.log(venue.date);
			console.log(venue.title);
			console.log(venue.start_time);
			console.log(venue.end_time);
			console.log('\n')
		}

		res.contentType('json');
		res.send({ events: docs });
	});
};



exports.wordcloud = function(req, res) {
	twit.get('trends/place', { id: 2458833 }, function (err, data) {
		var trends = data[0].trends;
		for(i=0; i<trends.length; i++){
			console.log(trends[i].name)
		}
	});

};



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



exports.heatmap = function(req, res) {
	twit.get('search/tweets', { 
		  geocode: '29.951462,-90.081053,2mi'
		, result_type: 'recent'
		, include_entities: false
		}, function (err, data) {
			for(i=0; i<data.statuses.length; i++){
				item = data.statuses[i];
				console.log(item.text)
			}

				res.contentType('json');
				res.send({ object: data }); 
			});

};



exports.psa = function(req, res) {

};



exports.changes = function(req, res) {

};



exports.accountfeed = function(req, res) {

};
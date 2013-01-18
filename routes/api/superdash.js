  var mongoose = require('mongoose')
    , events = require('../../models/events')
    , tweets = require('../../models/tweets')
  	, Twit = require('twit')  


var twat = new Twit({
    consumer_key:         'Ak2dsjQhvYtsiJ343Q'
  , consumer_secret:      'iuh6rHrlfY7qDnhWMctDCuR4J67N1vOOVq3jL5YVQ'
  , access_token:         '16586793-rBtnLLXcQ8wt5gBjP99SFUrtKiSSRCg3uN3PdIpaR'
  , access_token_secret:  'iMMjANsVy9DvrB53dd5LQvH4nzU05X0djo5mmuUw'
});




exports.events = function(req, res) {
	var query = events.find({}).limit(10);
	query.exec(function(error, docs){
		console.log(JSON.stringify(docs, null, 4));
		res.contentType('json');
		res.send({ events: docs });
	});
};



exports.wordcloud = function(req, res) {
	twat.get('trends/place', { id: 2458833 }, function (err, data) {
		console.log(data)

	});

};



exports.official = function(req, res) {
	
	twat.get('lists/statuses', { list_id: '83856674', include_rts: false },  function (err, data) {
		console.log(data)	 
		res.contentType('json');
		res.send({ object: data }); 
	})


};



exports.heatmap = function(req, res) {
	twat.get('search/tweets', { 
								  geocode: '29.951462,-90.081053,2mi'
								, result_type: 'recent'
								, include_entities: false
								}, function (err, data) {
									console.log(data.length);
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
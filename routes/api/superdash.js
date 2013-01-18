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



exports.official = function(req, res) {

};



exports.wordcloud = function(req, res) {
	
	twat.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, reply) {
		console.log(reply)	 
		res.contentType('json');
		res.send({ events: docs }); 
	})


};



exports.heatmap = function(req, res) {

};



exports.psa = function(req, res) {

};



exports.changes = function(req, res) {

};



exports.accountfeed = function(req, res) {

};
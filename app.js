var config = require('./config');
var routes = require('./routes');
var express = require('express');
var http = require('http');
var twitter = require('./lib/twitter');


var app = express();
app.locals.title = config.title;

app.use(express.bodyParser());
app.use(express.errorHandler());
app.use(express.favicon());
app.use(express.logger());
app.use(express['static']('./public'));

app.get('/', routes.home);
app.get('/left', routes.left);
app.get('/right', routes.right);

app.get('/superdash/accountfeed', routes.superdash.accountfeed);
app.get('/superdash/changes', routes.superdash.changes);
app.get('/superdash/events', routes.superdash.events);
app.get('/superdash/heatmap', routes.superdash.heatmap);
app.get('/superdash/instagram', routes.superdash.instagram);
app.get('/superdash/instagram/callback', routes.superdash.instagram_callback);
app.post('/superdash/instagram/callback', routes.superdash.instagram_callback_post);
app.get('/superdash/psa', routes.superdash.psa);
app.all('/superdash/*', function (req, res) {
  res.json(res.jsonData);
});


app.listen(config.port, function(){
  console.log("Express server listening on port " + config.port);
});

twitter.listen(http.createServer(app));

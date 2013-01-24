var config = require('./config');
var routes = require('./routes');
var express = require('express');
var jadeBrowser = require('jade-browser');
var mongoose = require('mongoose');
var http = require('http');
var twitter = require('./lib/twitter');


var app = express();
app.locals.title = config.title;

app.use(express.bodyParser());
app.use(express.errorHandler());
app.use(express.favicon());
app.use(express.logger());
app.use('/img', express['static']('./public/img'));
app.use(require('connect-assets')({ src: './public' }));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

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

// Export jade templates to reuse on client side
// This includes a kind of terrible cache-buster hack
// It generates a new cache-busting query string for the script tag every time the server starts
// This should probably only happen every time there's a change to the templates.js file
var jadeTemplatesPath = '/js/templates.js';
app.use(jadeBrowser(jadeTemplatesPath, ['*.jade', '*/*.jade'], { root: __dirname + '/views', minify: true }));
var jadeTemplatesCacheBuster = (new Date()).getTime();
var jadeTemplatesSrc = jadeTemplatesPath + '?' + jadeTemplatesCacheBuster;
global.jadeTemplates = function() { return '<script src="' + jadeTemplatesSrc + '" type="text/javascript"></script>'; };


app.listen(config.port, function(){
  console.log("Express server listening on port " + config.port);
});

twitter.listen(http.createServer(app));
mongoose.connect(config.mongodb);

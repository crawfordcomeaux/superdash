var config = require('../config');
var events = require('../models/events');
var Ntwitter = require('ntwitter');

exports.listen = function (server) {
  var io = require('socket.io').listen(server);
  var twit = new Ntwitter(config.twitter);

  var id = 0;
  (function stream() {
    twit.stream('statuses/filter', { 'follow': config.twitter_ids.join(',') }, function (stream) {
      stream.on('data', function (data) {
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

      stream.on('error', function (err, data) {
        console.log('Twitter stream error: ' + err + ': ' + data);
      });
    });
  }()); // stream();

  //TODO: wat?
  setInterval(function () {
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
  }, 10000);

  io.of('/nolatweets').on('connection', function (socket) {
    socket.on('tweet-hide', function(id) {
      socket.broadcast.emit('tweet-hide', id);
    });
  });

  io.sockets.on('connection', function (socket) {
    //console.log('connection');
  });

  io.of('/events').on('connection', function(socket) {
    //TODO: call events.findAll() and emit.
  });
};

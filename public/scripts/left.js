window.onload = function(){    

	var heatmap =function() {
		console.log('in heatmap')
	   $.get('/superdash/heatmap', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(heatmap, 5000);

	};


	var wordcloud =function() {
		console.log('in wordcloud')
	   $.get('/superdash/wordcloud', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(wordcloud, 5000);

	};

	var official = io.connect('/official');
	official.on('tweet', function(data) {
	  console.log('got a tweet');
	  var tweets = $('ul.official-tweets');
          tweets.prepend('<li><img src="' + data.profile_image_url + '" />' + data.screen_name + '<p>' + data.text + '</p></li>'); 	
	});
};

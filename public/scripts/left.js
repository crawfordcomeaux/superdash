
window.onload = function(){    



	var heatmap =function() {
		console.log('in heatmap')
	   $.get('/superdash/heatmap', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(heatmap, 5000);

	};


	var instagram =function() {
		console.log('in instagram')
	   $.get('/superdash/instagram', function (data) {
	     	var images = data.url
	     	var output = '<ol>';
	     	for(i=0;i<images.length;i++){
	     		var image = images[i];
	     		console.log(image.image)
	     		output += '<li><img src="' + image.image + '"></li>'
	     	}

	     	output += '</ol>'

	     	$('#images').replaceWith(output)

	    });

	 setTimeout(instagram, 5000);

	}

<<<<<<< HEAD
/*
	var official =function() {
		console.log('in official')
	   $.get('/superdash/official', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(official, 5000);

<<<<<<< HEAD
	}
*/
	setTimeout(instagram, 5000);
	//setTimeout(official, 5000);

=======
	var official = io.connect('http://localhost/official');
=======
	};

	var official = io.connect('/official');
>>>>>>> 616155327b8199e8e9032bb722c8f0726ad8780b
	official.on('tweet', function(data) {
	  console.log('got a tweet');
	  var tweets = $('ul.official-tweets');
          tweets.prepend('<li><img src="' + data.profile_image_url + '" />' + data.screen_name + '<p>' + data.text + '</p></li>'); 	
<<<<<<< HEAD
	}
>>>>>>> a07ce57950165c01ca304fdc6a8126460e3fcf0d
=======
	});
>>>>>>> 616155327b8199e8e9032bb722c8f0726ad8780b
};

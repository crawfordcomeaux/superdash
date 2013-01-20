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

//	 setTimeout(instagram, 5000);

	}

/*
	var official =function() {
		console.log('in official')
	   $.get('/superdash/official', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(official, 5000);


	}
*/
//	setTimeout(instagram, 5000);
	//setTimeout(official, 5000);
};

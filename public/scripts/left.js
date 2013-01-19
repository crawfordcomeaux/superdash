
window.onload = function(){    



	var heatmap =function() {
		console.log('in heatmap')
	   $.get('/superdash/heatmap', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(heatmap, 5000);

	}


	var instagram =function() {
		console.log('in instagram')
	   $.get('/superdash/instagram', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 setTimeout(instagram, 5000);

	}


	var official =function() {
		console.log('in official')
	   $.get('/superdash/official', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 setTimeout(official, 5000);

	}

	setTimeout(instagram, 5000);
	setTimeout(official, 5000);

};
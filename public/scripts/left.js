
window.onload = function(){    


	var events =function() {
		console.log('in events')
	   $.get('/superdash/events', function (data) {
	      console.log(status);
	      console.log(data);

	         
	    });

	 //setTimeout(events, 5000);

	}


	var heatmap =function() {
		console.log('in heatmap')
	   $.get('/superdash/heatmap', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(heatmap, 5000);

	}


	var wordcloud =function() {
		console.log('in wordcloud')
	   $.get('/superdash/wordcloud', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 //setTimeout(wordcloud, 5000);

	}


	var official =function() {
		console.log('in official')
	   $.get('/superdash/official', function (data) {
	      console.log(status);
	      console.log(data);
	    });

	 setTimeout(official, 50000000);

	}


	setTimeout(official, 50000000);

};
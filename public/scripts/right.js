
window.onload = function(){    


	var events =function() {
		console.log('in events')
	   $.get('/superdash/events', function (data) {
	   		var events = data.events
			var output = '<ul>';
				for(i=0; i<events.length; i++){
					var myevent = events[i]
					console.log(myevent.venue)
					output += '<li>' + myevent.venue + '</li>';
				}
		    		output += '</ul>';

		    console.log(output);

		    $('#events').append(output);

		    setTimeout(events, 5000);
		  });
	      
	    }

	    setTimeout(events, 5000);

	}


	

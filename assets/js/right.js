
window.onload = function(){    

/*
	var events = io.connect('/events');
	var eventlist = '';
        events.on('events', function(events) {
		eventlist = events;
		processEvents();
	});

	function processEvents() {
		
	}

*/
	var events = function() {
//		console.log('in events')
	

	   $.get('/superdash/events', function (data) {
	   		var events = data.events
			var output = '<ul>';
				for(i=0; i<events.length; i++){
					var myevent = events[i]
					console.log(myevent.venue)
					output += '<li>' + myevent.venue + '&nbsp;' + myevent.date + '&nbsp;' + myevent.title  + '&nbsp;' + myevent.start_time + '-' + myevent.end_time + '</li>';
				}
		    		output += '</ul>';

		    console.log(output);

		    $('#events').append(output);

		    setTimeout(events, 30000);
		  });
	      
	    }

	    setTimeout(events, 30000);

*/	    

}


	

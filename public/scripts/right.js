
window.onload = function(){    


	var events =function() {
		console.log('in events')
	   $.get('/superdash/events', function (data) {
		
		    var output = '<ul id="listname" data-inset=true>';
		    $.each(res, function (i, Object) {
		       output += '<li>' + Object.reg + '</li>';
		     });
		    output += '</ul>';

		    console.log(output);

		    $("#myObject").append(output).trigger("create");
		    $("#myObject").listview();
		    $("#myObject").listview('refresh');
		  }
	      
	    });

	 //setTimeout(events, 5000);

	}


	setTimeout(events, 5000);

};
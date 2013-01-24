window.onload = function(){    
    

    var instagram = function() {
	console.log('in instagram');
	$.get('/superdash/instagram', function (data) {
	    var images = data.url;
	    var output = '<ol>';
	    for(i=0;i<images.length;i++){
	     	var image = images[i];
	     	//console.log(image.image);
	     	output += '<li><img src="' + image.image + '"></li>';
	    }

	    output += '</ol>';

	    $('#images').replaceWith(output);

	});

	//	 setTimeout(instagram, 5000);

    };

    var myLatlng = new google.maps.LatLng(29.951462,-90.081053);
    // define map properties
    var myOptions = {
	zoom: 9,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: false,
	scrollwheel: true,
	draggable: true,
	navigationControl: true,
	mapTypeControl: false,
	scaleControl: true,
	disableDoubleClickZoom: false
    };
    // we'll use the heatmapArea
    var map = new google.maps.Map($("#heatmapArea")[0], myOptions);
    // let's create a heatmap-overlay
    // with heatmap config properties
    var heatmap = new HeatmapOverlay(map, {
	"radius": 20,
	"visible": true,
	"opacity": 60
    });
    
    // here is our dataset
    // important: a datapoint now contains lat, lng and count property!
    var testData = {
	max: 46,
	data: [{lat: 33.5363, lng:-117.044, count: 1},{lat: 33.5608, lng:-117.24, count: 1},{lat: 38, lng:-97, count: 1},{lat: 38.9358, lng:-77.1621, count: 1}]
    };
    
    // now we can set the data

    // TODO - Give me sockets & stream to me

    google.maps.event.addListenerOnce(map, "idle", function(){
	// this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
	//heatmap.setDataSet(testData);
	setInterval(heatmapData, 3000);
    });

    var num = 0;

    var heatmapData = function() {
	$.get('/superdash/heatmap', function (data) {
	    if(num > 20) {
		heatmap.heatmap.clear();
		num = 0;
	    }
	    if(data.object) {
		for(var i in data.object.statuses) {
		    var coordinates = data.object.statuses[i].coordinates;
		    if(coordinates) {
			heatmap.addDataPoint(coordinates.coordinates[1], coordinates.coordinates[0], 1);
			num++;
		    }
		}
	    }
	});
    };
};

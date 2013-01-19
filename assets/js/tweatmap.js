      var map, pointarray, heatmap;
      var taxiData = [
        new google.maps.LatLng(37.782551, -122.445368)
      ];



      function initialize() {
           var config = {
    "radius": 30,
    "element": "map_canvas",
    "visible": true,
    "opacity": 40,
    "gradient": { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }
      };



      var myOptions = {
          zoom: 2,
          center: new google.maps.LatLng(37.774546, -122.433523),
          mapTypeId: google.maps.MapTypeId.ROADMAP};

        map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
        heatmap = new HeatmapOverlay(map, {"radius":30, "visible":true, "opacity":60, "gradient": { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }});
        google.maps.event.addListener(map, "idle", function(){
        //heatmap.setDataSet(testData);
        });

         $.eventsource({
            label: "json-event-source",
            url: "http://localhost:5000/tweets?callback=loomit",
            dataType: "json",
          open: function() {

            console.log( "opened" );

        },
        message: function( data ) {

            console.log(  data.coordinates.coordinates );
            heatmap.addDataPoint(data.coordinates.coordinates[1], data.coordinates.coordinates[0]);

        },
         // $.eventsource("close", "json-event-source");


      }

      )};

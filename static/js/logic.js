// API key
var API_KEY = "pk.eyJ1Ijoia2F1c2hhbDkzdiIsImEiOiJja3Azc2o4aDEwOG1uMnBxdnI5NXljN3Z5In0.on-unXgqpACSwjk7aXBd2Q";

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [33.867, -117.513],
    zoom: 4
});

  // Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10", 
    accessToken: API_KEY
}).addTo(myMap);
  
  // Use this link to get the geojson data.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    console.log(data);
    earthquakes = data.features;

    for (var i=0; i < earthquakes.length;i++){
        coords = [earthquakes[i].geometry.coordinates[1],earthquakes[i].geometry.coordinates[0]];
        //console.log(coords);
        mag = earthquakes[i].properties.mag;
        place =  earthquakes[i].properties.place;
        
        // //define layer names:
        // var layers = [
        //   '0-1',
        //   '1-2',
        //   '2-3',
        //   '3-4',
        //   '4-5',
        //   '5+'
        // ];

        var color = "";
        color = "#ea2c2c";
            if (mag > 5) {
        }
        else if (mag > 4) {
          color = "#ea822c";
        }
        else if (mag > 3) {
          color = "#ee9c00";
        }
        else if (mag>2) {
          color = "#eecc00";
        }
        else if (mag >1){
            color = "#d4ee00";
        }
        else {
            color = "#98ee00";
        }

        L.circle(coords, {
            fillOpacity: 0.75,
            color: "black",
            fillColor: color,
            // Adjust radius
            radius:  25000*mag
          }).bindPopup("<h3>" + place + "</h3>" + "<hr>" + "Magnitude:"+ mag ).addTo(myMap);
        }
        
        function getColor(d) {
            return d > 5 ? '#ea2c2c' :
                   d > 4  ? '#ea822c' :
                   d > 3  ? '#ee9c00' :
                   d > 2  ? '#eecc00' :
                   d > 1   ? '#d4ee00' :
                   d > 0   ? '#98ee00' :
                   
                              '#FFEDA0';
        }

        var legend = L.control({position: 'bottomright'});
        
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend'),
            grades = [0,1,2,3,4,5],
            labels = [],
            from, to;
  
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {

              from = grades[i];
              to= grades[i+1];

              labels.push(
                  '<i style="background:' + getColor(from + 1) + '"></i> ' +
                  from + (to ? '&ndash;' + to : '+')
                );
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
          
      legend.addTo(myMap);
    }
)

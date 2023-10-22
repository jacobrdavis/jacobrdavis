var map = L.map('map').setView([35, -95], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Load Geo json
// var geojsonLayer = new L.GeoJSON.AJAX("foo.geojson");
// geojsonLayer.addTo(map);

var ianTrack = new L.Shapefile("data/ian/AL092022_lin.shp");
ianTrack.addTo(map);
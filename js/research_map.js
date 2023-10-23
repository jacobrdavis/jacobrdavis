var map = L.map('map').setView([35, -95], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var trackStyle = {
    "color": "#646464",
    "weight": 1,
    "opacity": 1,
};

var swathStyle = {
    "color": "#646464",
    "weight": 0,
    "opacity": 0.3,
};

function addHurricane(shpPath) {
    new L.Shapefile(shpPath + "_lin", {
        style: trackStyle
    }).addTo(map);

    new L.Shapefile(shpPath + "_windswath", {
        style: swathStyle
    }).addTo(map);
}

addHurricane("data/ian/AL092022")
// addHurricane("data/fiona/AL072022")
addHurricane("data/idalia/AL102023")
addHurricane("data/lee/AL132023")


var buoyStyle = {
    radius: 3,
    fillColor: "#f7cf05",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function addBuoy(path) {
    new L.GeoJSON.AJAX(path, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, buoyStyle);
        }
    }).addTo(map);
}

addBuoy("data/ian/ian_buoys.geojson")
// addBuoy("data/fiona/fiona_buoys.geojson")
addBuoy("data/lee/lee_buoys.geojson")
addBuoy("data/idalia/idalia_buoys.geojson")

// TODO: add Arctic cable buoys?
// Add duck buoys, hood canal



// geojsonLayer.addTo(map);

var map = L.map('map').setView([35, -95], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var trackStyle = {
    color: "#646464",
    weight: 1.5,
    opacity: 1,
    interactive: true,
};


var trackMouseoverStyle = {
    color: "#fc7f03",
    weight: 3,
    opacity: 1,
    interactive: true,
};

var swathStyle = {
    color: "#646464",
    weight: 0,
    fillOpacity: 0.1,
    interactive: false,
};


var swathMouseoverStyle = {
    color: "#fc7f03",
    weight: 0,
    fillOpacity: 0.3,
    interactive: true,
};

var buoyStyle = {
    radius: 3,
    fillColor: "#f7cf05",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
    interactive: false,
};

var clickRegionStyle = {
    radius: 1e5,
    fillColor: "#fc7f03",
    color: "#fc7f03",
    weight: 1,
    opacity: 0.5,
    fillOpacity: 0.2,
    interactive: true,
};

var clickRegionMouseoverStyle = {
    radius: 2e5,
    fillOpacity: 0.4,
    // fillColor: 'green'
};

function addHurricaneLine(shpPath, clickLink) {
    var line = new L.Shapefile(shpPath + "_lin", {
        style: trackStyle
    })
    .on('click', function(evt) {
        window.open(clickLink)
    })
    .on('mouseover', function(evt){
        line.setStyle(trackMouseoverStyle)
        // swath.setRadius(clickRegionMouseoverStyle.radius);
    })
    .on('mouseout', function(evt){
        line.setStyle(trackStyle);
        // swath.setRadius(clickRegionStyle.radius);

    });
    return line
};

function addHurricaneSwath(shpPath, clickLink) {
    var swath = new L.Shapefile(shpPath + "_windswath", {
        style: swathStyle
    })
    // .on('click', function(evt) {
    //     window.open(clickLink)
    // })
    // .on('mouseover', function(evt){
    //     swath.setStyle(swathMouseoverStyle)
    //     // swath.setRadius(clickRegionMouseoverStyle.radius);
    // })
    // .on('mouseout', function(evt){
    //     swath.setStyle(swathStyle);
    //     // swath.setRadius(clickRegionStyle.radius);

    // });
    return swath;
};

function addBuoy(path) {
    return new L.GeoJSON.AJAX(path, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(
                latlng,
                buoyStyle,
            );
        }
    });
};

function addClickRegion(latlng, clickLink) {
    var clickRegion = L.circle(latlng, clickRegionStyle)
        // .bindTooltip("<h3>  Ian </h3>", { direction: "top" })
        .on('click', function(evt) {
            window.open(clickLink);
        })
        .on('mouseover', function(evt){
            clickRegion.setStyle(clickRegionMouseoverStyle)
            clickRegion.setRadius(clickRegionMouseoverStyle.radius);
        })
        .on('mouseout', function(evt){
            clickRegion.setStyle(clickRegionStyle);
            clickRegion.setRadius(clickRegionStyle.radius);

        });
    return clickRegion
};

// TODO: make groups toggle
var ianGroup = L.featureGroup([
    addHurricaneLine("data/ian/AL092022", "https://leafletjs.com/reference.html#circlemarker"),
    addHurricaneSwath("data/ian/AL092022", "https://leafletjs.com/reference.html#circlemarker"),
    addBuoy("data/ian/ian_buoys.geojson").bringToFront(),
    // addClickRegion([26.808263, -82.397611], "https://leafletjs.com/reference.html#circlemarker").bringToFront()
]).addTo(map);
// TODO: update link to local header  https://stackoverflow.com/questions/2835140/how-do-i-link-to-part-of-a-page-hash

// var fionaGroup = L.featureGroup([
//     addHurricaneLine("data/fiona/AL072022"),
//     addHurricaneSwath("data/fiona/AL072022"),
//     addBuoy("data/fiona/fiona_buoys.geojson").bringToFront(),
//     addClickRegion([28.808263, -85.397611], "https://leafletjs.com/reference.html#circlemarker").bringToFront()
// ]).addTo(map);

var idaliaGroup = L.featureGroup([
    addHurricaneLine("data/idalia/AL102023"),
    addHurricaneSwath("data/idalia/AL102023"),
    addBuoy("data/idalia/idalia_buoys.geojson").bringToFront(),
    // addClickRegion([29.5, -83.5], "https://leafletjs.com/reference.html#circlemarker").bringToFront()
]).addTo(map);

var leeGroup = L.featureGroup([
    addHurricaneLine("data/lee/AL132023"),
    addHurricaneSwath("data/lee/AL132023"),
    addBuoy("data/lee/lee_buoys.geojson").bringToFront(),
    // addClickRegion([41, -68.5], "https://leafletjs.com/reference.html#circlemarker").bringToFront()
]).addTo(map);


// https://gis.stackexchange.com/questions/412225/make-point-markers-lead-to-a-webpage-link-on-click-using-leaflet
//https://gis.stackexchange.com/questions/418903/change-marker-icon-on-mouseover-mouseout-in-leaflet
// https://gis.stackexchange.com/questions/320887/changing-color-and-opening-label-on-hover
//https://gis.stackexchange.com/questions/267198/clicking-through-one-layer-onto-another-in-leaflet

//https://gis.stackexchange.com/questions/137061/changing-layer-order-in-leaflet
// https://gis.stackexchange.com/questions/412225/make-point-markers-lead-to-a-webpage-link-on-click-using-leaflet
//https://gis.stackexchange.com/questions/317232/onclick-for-layer-groups-in-leaflet


// addHurricane("data/ian/AL092022")
// addHurricane("data/fiona/AL072022")
// addHurricane("data/idalia/AL102023")
// addHurricane("data/lee/AL132023")



// function addBuoy(path) {
//     new L.GeoJSON.AJAX(path, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(
//                 latlng,
//                 buoyStyle,
//             );
//         }
//     }).addTo(map);
// }

// addBuoy("data/ian/ian_buoys.geojson")
// addBuoy("data/fiona/fiona_buoys.geojson")
// addBuoy("data/lee/lee_buoys.geojson")
// addBuoy("data/idalia/idalia_buoys.geojson")


// for (var i = 0; i < data.length; i++) {
//     L.marker(data[i].coord, {
//       icon: logo,
//       alt: "Patrick Engineering logo",
//       title: "Click for more info",
//       riseOnHover: true,
//       myUrl: data[i].url
//     })
//       .addTo(map)
//       .bindTooltip("<h3>  Test </h3>", { direction: "top" })
//       .on('click', function(evt) {
//         window.open(evt.target.options.myUrl, '_blank');
//       });
//   }


// TODO: add Arctic cable buoys?
// Add duck buoys, 
// Add hood canal
// Add NHCI test



// geojsonLayer.addTo(map);

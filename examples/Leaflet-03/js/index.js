// http://www.liedman.net/leaflet-routing-machine/

var map = new L.Map('map', {
    'center': [0, 0],
    'zoom': 2,
    'layers': [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    attributionControl: false
});

var control = L.Routing.control({
    waypoints: [
        L.latLng(-33.4569397, -70.6482697),
        L.latLng(-33.0245, -71.5523)
    ],
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    reverseWaypoints: true,
    showAlternatives: true,
    lineOptions: {
        styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'steelblue', opacity: 1, weight: 4 }
        ]
    },
    altLineOptions: {
        styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'hotpink', opacity: 1, weight: 4 }
        ]
    }
}).addTo(map);

L.Routing.errorControl(control).addTo(map);
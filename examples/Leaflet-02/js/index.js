var map = new L.Map('map', {
    'center': [0, 0],
    'zoom': 3,
    'layers': [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    attributionControl: false
});

var styles = [
    { color: 'white', opacity: 1, weight: 8 },
    { color: '#396A92', opacity: 1, weight: 5 },
    { color: '#4682B4', opacity: 1, weight: 1 }
]

var points = [
    [-33.4569397, -70.6482697],
    [48.8534000, 2.3486000]
], 
geodesics = [];

_.each(points, function(a, b){
    var route = [];
    
    if(b > 0){
        var p1 = new L.LatLng( points[b - 1][0], points[b - 1][1] );
        var p2 = new L.LatLng( a[0], a[1] );
    
        route.push([p1, p2]);
        
        _.each(styles, function(c, d){
            Geodesic = new L.geodesic(route, c);
            geodesics.push(Geodesic);
        });
    }
});

var geodesicgroup = L.featureGroup(geodesics);
geodesicgroup.addTo(map);

bounds = geodesicgroup.getBounds();

map.fitBounds([
        [bounds.getSouthWest(), bounds.getNorthEast()],
        [bounds.getSouthEast(), bounds.getNorthWest()]
    ],
    { 'padding': [10, 10]}
);

var map = new L.Map('map', {
    'center': [0, 0],
    'zoom': 3,
    'layers': [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    attributionControl: false
});

var styles = [
    { color: 'white', opacity: 0.5, weight: 5 },
    { color: '#396A92', opacity: 0.5, weight: 3 },
    { color: '#4682B4', opacity: 0.8, weight: 1 }
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
            
            if(d == styles.length - 1){
                show_plane({points: geodesics, path: 0 });
            }
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


function show_plane(data, callback){
    var callback = callback || function(){};
    var size = _.size(data.points);
    var latlon = data.points[data.path].getLatLngs()[0]
    var pathPattern = L.polylineDecorator(latlon).addTo(map);
    var arrowOffset = 0;
    var anim = window.setInterval(function() {
        pathPattern.setPatterns([
        {
            offset: arrowOffset+'%', 
            repeat: 0, 
            symbol: L.Symbol.marker({
                rotate: true, 
                markerOptions: {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/bbecquet/Leaflet.PolylineDecorator/master/example/icon_plane.png',
                        iconAnchor: [16, 16]
                    })
                }, 
                pathOptions: { stroke: true }
            })
        }
        ]);

        var distance = latlon[0].distanceTo(latlon[latlon.length - 1]) / 1000;

        arrowOffset += 100 * 10 / distance;

        if(arrowOffset > 100){
            arrowOffset = 0;
            window.clearInterval(anim);
            pathPattern.clearLayers();

            if(data.path + 1 == size){
                data.path = -1;

                setTimeout(function(){
                    show_plane({points: data.points, path: data.path + 1 });
                }, 2000);
            } else {
                setTimeout(function(){
                    show_plane({points: data.points, path: data.path + 1 });
                }, 1000);
            }
        }
    }, 10);

}
var map = new L.Map('map', {
    'center': [0, 0],
    'zoom': 2,
    'layers': [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    attributionControl: false
});

var icon = L.Icon.extend({ 
    options: {} 
});

var icon1 = new icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/location-512.png',
    iconSize: [32, 32],
    number: 1
});

var icon2 = new icon({
    iconUrl: 'https://png.pngtree.com/svg/20170727/place_316551.png',
    iconSize: [32, 32]
});

var points = [
    [-33.4569397, -70.6482697]
];
var marker = new L.marker(points[0], {
    icon: icon1
});

marker.addTo(map);

map.on('click', function(){
    if(marker.options.icon.options.number == 1){
        marker.setIcon(icon2);
    } else {
        marker.setIcon(icon1);
    }   
});
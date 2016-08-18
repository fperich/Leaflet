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
    iconUrl: 'https://www.giscoeapp.lrc.gov.on.ca/AIA/Resources/Images/Pushpins/map-marker-red-32.png',
    iconSize: [32, 32],
    number: 1
});

var icon2 = new icon({
    iconUrl: 'https://www.gulbarga.online/wp-content/uploads/favicon.png',
    iconSize: [32, 32]
});

var points = [
    [-35, -70], 
    [48, 15]
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
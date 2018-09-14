L.Map = L.Map.extend({
    openPopup: function(popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
        this._popup = popup;
        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
});

var map = new L.Map('map', {
    'center': [0, 0],
    'zoom': 2,
    'layers': [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    attributionControl: false
});

var markers = [
    { pos: [-33.4569397, -70.6482697], popup: 'Santiago' },
    { pos: [48.8534000, 2.3486000], popup: 'Paris'}
];

_.each(markers, function(obj){
	var marker = L.marker(obj.pos).addTo(map);
    var p = new L.Popup({ autoClose: false, closeOnClick: false })
        .setContent(obj.popup)
        .setLatLng(obj.pos);
    marker.bindPopup(p).openPopup();
});
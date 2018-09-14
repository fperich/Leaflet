L.Map = L.Map.extend({
    openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
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

var points = [
    [-33.4569397, -70.6482697],
    [48.8534000, 2.3486000]
],
    markers = [];

_.each(points, function (a, b) {
    var marker = new L.Marker(a).bindPopup(a.toString());
    markers.push(marker);
});

var markersgroup = L.featureGroup(markers);
markersgroup.addTo(map);

var bounds = markersgroup.getBounds();

map.fitBounds([
    [bounds.getSouthWest(), bounds.getNorthEast()],
    [bounds.getSouthEast(), bounds.getNorthWest()]
]);
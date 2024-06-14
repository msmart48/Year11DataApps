

const mapArea = document.getElementById('mapArea');     //make a ref to the area to place map on page
var map;                                                //make a global ref to access map methods


loadMap();                                              //start the program

//Load the map from leaftlet an zoom onto adelaide at the start of the program
function loadMap() {
    //load the map and starting point with zoom using lat and lon on Adelaide
    map = L.map('map').setView([-34.92, 138.61], 6);
    //load the map tiles and add to map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(map);



    //add a click function to add markers where you click
    map.on('click', function (e) {
        //create a marker
        L.marker(e.latlng).addTo(map).bindPopup("a markers information");
    });
}



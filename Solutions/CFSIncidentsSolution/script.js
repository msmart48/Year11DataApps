var homeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const mapArea = document.getElementById('mapArea');     //make a ref to the area to place map on page
var map;                                                //make a global ref to access map methods
var data;
var markers = [];
var your_location
loadMap();                                              //start the program
fetchAllData();

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
        //check to see if me on map if so delete before plotting new one
        if (your_location) {
            your_location.remove();
        }
        //create a marker and save values to home variable
        your_location = L.marker(e.latlng, { icon: homeIcon }).addTo(map).bindPopup("Me");
        checkDistanceToIncidents();
    });
}

//get the data from the cfs site and parse to data as JSON.

async function fetchAllData() {
    try {
        const response = await fetch('https://data.eso.sa.gov.au/prod/cfs/criimson/cfs_current_incidents.json');
        data = await response.json();
        addIncidentsToMap();    //add the incidents to the map using the data
    } catch (error) {
        console.error(error);
    }
}



function addIncidentsToMap() {
    data.forEach(element => {
        //strip out the lat and lon from the data set
        let loc = element.Location.split(',');
        let lat = parseFloat(loc[0]);
        let lon = parseFloat(loc[1]);

        //add the marker to the map and bind a pop up with incident details HINT: go to console log and type data. explore data to find field names
        //sometimes it better to push a marker to an array so you can beeter access it later and remove it
        let incident = L.marker([lat, lon]).addTo(map).bindPopup(`Incident: ${element.Type}<br>Location: ${element.Location_name}`);
        //add to an array
        markers.push(incident);

    });

}

function checkDistanceToIncidents() {
    //can you extend your app to only put markers on the map if its closer to your location?
    //You may have to use a distance formula to calculate distance between two points usingh the measureDistance function

    if (your_location != null) {
        //must loop in reverse to allow for delete and removal of markers
        for (var i = markers.length - 1; i >= 0; i--) {
            var dist = measureDistance(markers[i].getLatLng().lat, markers[i].getLatLng().lng, your_location.getLatLng().lat, your_location.getLatLng().lng);
            //distance within 100km
            console.log(dist);
            if (parseFloat(dist) > 100) {
                //remove the marker
                markers[i].remove();
                markers.splice(i, 1);
            }
        }
    }
}

//measure distance between two points in km
function measureDistance(point_lat, point_lon, you_lat, you_lon) {
    //console.log(point_lat, point_lon, you_lat, you_lon);

    // Ensure the coordinates are numbers
    point_lat = parseFloat(point_lat);
    point_lon = parseFloat(point_lon);
    you_lat = parseFloat(you_lat);
    you_lon = parseFloat(you_lon);

    //console.log("Parsed coordinates: ", point_lat, point_lon, you_lat, you_lon);

    var from = turf.point([you_lon, you_lat]);  // [longitude, latitude]
    var to = turf.point([point_lon, point_lat]);  // [longitude, latitude]
    var options = { units: 'kilometers' };
    var distance = turf.distance(from, to, options);
    //console.log(distance)
    return distance;
}
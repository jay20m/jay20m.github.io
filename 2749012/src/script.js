// set map
 mapboxgl.accessToken = 'pk.eyJ1IjoiamF5MjBtIiwiYSI6ImNsY3FhdThzbzAxdjIzdnAzNzliZmp6NjAifQ.GzpyQziIQ5hP-pNszrIKwQ';

 const map = new mapboxgl.Map({
 container: 'map',
 style: 'mapbox://styles/jay20m/cldk3by9a000k01oegr2cf3yn',
 center: [-73.0155, 43.6446],//starting position
 zoom: 9
 });

 map.addControl(new mapboxgl.NavigationControl());

/*
Add an event listener that runs
 when a user clicks on the map element.
*/
map.on('click', (event) => {
const features = map.queryRenderedFeatures(event.point, {
 layers: ['2020-vt']
});
if (!features.length) {
 return;
}
const feature = features[0];
  
  /*Create a popup */
 const popup = new mapboxgl.Popup({ offset: [0, -15], className: 'my-popup' })
.setLngLat(feature.geometry.coordinates)
.setHTML(`<h2>Fire name: ${feature.properties.FIRE_NAME}</h2>
<p>Date: ${feature.properties.DISCOVERY_DATE}</p>
<p style="color:red;">Classification of fire: ${feature.properties.NWCG_CAUSE_CLASSIFICATION}</p>
<p>Size of wildfire: ${feature.properties.FIRE_SIZE}</p>`
    )
    .addTo(map);
});

//add a find my current location control
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);

//add a geocoder search control
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Vermont", // Placeholder text for the search bar
  proximity: {
    longitude: -73.0155,
    latitude: 43.6446
  } // Coordinates of Vermont center
});

map.addControl(geocoder, "top-right");



 document.getElementById('filters').addEventListener('change', (event) => {

    //for checkbox A, if checked, get category A buildings
    //Else, do nothing
    var checkBoxA = document.getElementById("ACheck");
    if (checkBoxA.checked == true){
      filterA = ['==', ['get', 'NWCG_GENERAL_CAUSE'], 'Debris and open burning'];
    } else {
      filterA = ['==', ['get', 'NWCG_GENERAL_CAUSE'], 'placeholder'];
    }
    
    //for checkbox B, if checked, get category B buildings
    //Else, do nothing
    var checkBoxB = document.getElementById("BCheck");
    if (checkBoxB.checked == true){
      filterB = ['==', ['get', 'NWCG_GENERAL_CAUSE'], 'Recreation and ceremony'];
    } else {
      filterB = ['==', ['get', 'NWCG_GENERAL_CAUSE'], 'placeholder'];
    }  
    
    //Set the filter based on the applied filter rules
    map.setFilter('2020-vt', ['any', filterA,filterB]);
});

// Add a scale bar
const scale = new mapboxgl.ScaleControl({
  maxWidth: 80, //size of the scale bar
  unit: "metric",
});
map.addControl(scale);
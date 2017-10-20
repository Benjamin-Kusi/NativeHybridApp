// Since we will be making use of 3rd party functions (eg. navigator.geolocation.getCurrentPosition) which are not native javascript functions we will need
// to add this function to the list of native javascript functions to allow javascript identify and execute it each time its called.
// This is done by using the addEventListener() function.
//
document.addEventListener("deviceready", getPosition, false);


//We decide to create a function to handle the 3rd party functions (eg. navigator.geolocation.getCurrentPosition)
// which we earlier added to the native functions of the javascript
/*function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}*/

// onSuccess Geolocation
//

/*var lat, lng;
function onSuccess(position) {

    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude  + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          + position.timestamp          + '<br />';
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        alert(lat+"................."+lng);
}*/

// onError Callback receives a PositionError object
//

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

function getPosition(){
    navigator.geolocation.getCurrentPosition(initMap,onError);
}



var map, marker, locationPoint, infoWindowOption, infoWindow;
function initMap(position){
    if (navigator.geolocation) {
        var mapOptions = {
        center: {lat: position.coords.latitude, lng: position.coords.longitude}, 
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        locationPoint = {position: mapOptions['center']};
        infoWindowOption = {content: 'You are here!'}
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        marker = new google.maps.Marker(locationPoint);
        marker.setMap(map);

        infoWindow = new google.maps.InfoWindow(infoWindowOption);
        google.maps.event.addListener(marker,'click', function(e){
            infoWindow.open(map, marker);
        });

       // function(){
        //handleLocationError(true, infoWindow, map.getCenter());
        //}
    }else{
        //Browser doesn't support Geolocation
        handleLocationError(false,infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

/*Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
startActivity(intent);*/
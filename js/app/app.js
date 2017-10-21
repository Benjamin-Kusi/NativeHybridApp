// Since we will be making use of 3rd party functions (eg. navigator.geolocation.getCurrentPosition) which are not native javascript functions we will need
// to add this function to the list of native javascript functions to allow javascript identify and execute it each time its called.
// This is done by using the addEventListener() function.
//
document.addEventListener("deviceready", getPosition, false);


/*onError Callback receives a PositionError object
 We decide to create a function to handle the 3rd party functions 
 (eg. navigator.geolocation.getCurrentPosition)
 which we earlier added to the native functions of the javascript*/
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

/*getPosition returns the current position in the map*/
function getPosition(){
    navigator.geolocation.getCurrentPosition(initMap,onError);
}



var map, marker, locationPoint, infoWindowOption, infoWindow;

/*initMap places a location icon on the mao based on the device's location*/
function initMap(position){
    if (navigator.geolocation) {
        var mapOptions = {
        center: {lat: position.coords.latitude, lng: position.coords.longitude}, 
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        locationPoint = {position: mapOptions['center']};
        infoWindowOption = {content: 'You are here!'}

        //calling google map
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        //adding the location marker icon
        marker = new google.maps.Marker(locationPoint);
        marker.setMap(map);

        //adding a description to tell yuser is.
        infoWindow = new google.maps.InfoWindow(infoWindowOption);
        google.maps.event.addListener(marker,'click', function(e){
            infoWindow.open(map, marker);
        });

    }else{
        //Browser doesn't support Geolocation
        handleLocationError(false,infoWindow, map.getCenter());
    }
}

/*handleLocationError checks whether the deveice's location was successful or not*/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

/*clearMap makes the map displayed currently to disappear*/
function clearMap(){
    var element = document.getElementById('map');
    element.innerHTML = "<center><b><h1>Map was cleared successfully!</h1></b></center>";
}

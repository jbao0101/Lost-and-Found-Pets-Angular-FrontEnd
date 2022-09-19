import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  title = 'google-maps';

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyAVUb8DbYfWr3ylaxt5hMIuhmZeBeSfiJM',
      libraries: ['geometry', 'places']
    })

    loader.load().then(() => {

    let map: google.maps.Map
    let infoWindow: google.maps.InfoWindow
    let service: google.maps.places.PlacesService
    let geocoder: google.maps.Geocoder
    let marker: google.maps.Marker;

    // Below commented out code is for an autocomplete feature for an input box I have,
    // but I question if we need it at all since we won't be looking for any one
    // establishment.

    // let autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"), {
    //   componentRestrictions: {'country': ['us']},
    //   fields: ['geometry', 'name'],
    //   types: ['establishment']
    // })

    // autocomplete.addListener("place_changed", () => {
    //   const place = autocomplete.getPlace();
    //   new google.maps.Marker({
    //     position: place.geometry.location,
    //     title: place.name,
    //     map: new google.maps.Map(document.getElementById('map'), {
    //       center: place.geometry.location,
    //       zoom: 12
    //     })
    //   })
    // })

    function initMap(): void {

    var location = { lat: -38.7131, lng: 90.4298 };

    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((loc) => {
      location.lat = loc.coords.latitude;
      location.lng = loc.coords.longitude;
      map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12
      })
    },
      (err) => {
        map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 12
        })
      })
    }

  map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 12
    });

  var request = {
    location: location,
    radius: 10000,
    type: 'veterinary_care',
    query: 'animal shelter'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  //Below is geocoding portion that is not yet fully functional

//   function codeAddress() {
//     geocoder = new google.maps.Geocoder();
//     var address = document.getElementById('input')!.innerHTML;
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == 'OK') {
//         map.setCenter(results![0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results![0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }

//   const submitButton = document.getElementById('submitButton');

//   if (submitButton != null){
//     submitButton.addEventListener("click", () =>
//     codeAddress()
//   );
// }

  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map,
  });

  const submitButton = document.getElementById('submitButton');
  const inputText = document.getElementById('input');
  const inputValue = (<HTMLInputElement>inputText).value;
  console.log(inputValue)
  if (submitButton != null){
    submitButton.addEventListener("click", () =>
    console.log(inputValue)
    // geocode({ address: inputValue })
  );
}

  function geocode(request: google.maps.GeocoderRequest): void {
  
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
  
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        return results[0].geometry.location;
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
        console.log(e)
      });

}

  //callback function to help with map marker creation
  function callback(results: string | any, status: any) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }

  //function that creates markers on the map
function createMarker(place: google.maps.places.PlaceResult) {
  if (!place.geometry || !place.geometry.location) return;

  const infowindow = new google.maps.InfoWindow();

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  //function that displays infowindow when a marker is clicked
  google.maps.event.addListener(marker, "click", () => {

    const content = document.createElement("div");

    const nameElement = document.createElement("h2");

    nameElement.textContent = place.name!;
    content.appendChild(nameElement);

    const placeIdElement = document.createElement("p");

    placeIdElement.textContent = place.formatted_phone_number!;
    content.appendChild(placeIdElement);

    const placeAddressElement = document.createElement("p");

    placeAddressElement.textContent = place.formatted_address!;
    content.appendChild(placeAddressElement);

    infowindow.setContent(content);
    infowindow.open(map, marker);
  });

}
  }
}

initMap()

    })
  }
}
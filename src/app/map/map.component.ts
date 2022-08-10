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
      // Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map: google.maps.Map
let infoWindow: google.maps.InfoWindow
let service: google.maps.places.PlacesService

function getPosition(){
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    return pos
  })
}

let currentPosition = getPosition()
console.log(currentPosition)

function initMap(): void {
  var pyrmont = { lat: 38.7131, lng: -90.4298 };

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 12
    });

  var request = {
    location: pyrmont,
    radius: 10000,
    type: 'veterinary_care',
    query: 'animal shelter'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results: string | any, status: any) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
//   const sydney = new google.maps.LatLng(-33.867, 151.195);

//   infoWindow = new google.maps.InfoWindow();

//   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//     center: sydney,
//     zoom: 15,
//   });

//   const request = {
//     query: "the arch",
//     fields: ["name", "geometry"],
//   };

//   service = new google.maps.places.PlacesService(map);

//   service.findPlaceFromQuery(
//     request,
//     (
//       results: google.maps.places.PlaceResult[] | null,
//       status: google.maps.places.PlacesServiceStatus
//     ) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//         for (let i = 0; i < results.length; i++) {
//           createMarker(results[i]);
//         }

//         map.setCenter(results[0].geometry!.location!);
//       }
//     }
//   );
// }


function createMarker(place: google.maps.places.PlaceResult) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(place.name || "");
    infoWindow.open(map);
  });
}

//   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//       center: {lat: 38.6833709, lng: -90.1994},
//       zoom: 10,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");

//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position: GeolocationPosition) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter()!);
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter()!);
//     }
//   });
// }

// function handleLocationError(
//   browserHasGeolocation: boolean,
//   infoWindow: google.maps.InfoWindow,
//   pos: google.maps.LatLng
// ) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
}
initMap()

      // new google.maps.Map(document.getElementById("map"),{
      //   center: {lat: 38.6833709, lng: -90.1994},
      //   zoom: 10,
      // })

      // this.watchPosition()
    })
    
  }

    watchPosition(){
    navigator.geolocation.watchPosition((position) => {
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let userCoords = position.coords
      return userCoords
    },(err) => {
      console.log(err);
    },{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }

}
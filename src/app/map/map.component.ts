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
    let geocode: google.maps.Geocoder

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
}

  function callback(results: string | any, status: any) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }

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

}

initMap()

    })
  }
}
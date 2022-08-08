import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { map } from 'rxjs';
declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  title = 'google-maps';

  ngOnInit(): void {
    const shelterIcon={
      url:'https://cdn-icons-png.flaticon.com/512/9/9773.png',
    scaledSize: {height: 30, width: 30},
  }

    let loader = new Loader({
      apiKey: 'AIzaSyAVUb8DbYfWr3ylaxt5hMIuhmZeBeSfiJM'
    })

    loader.load().then(() => {
    let map = new google.maps.Map(document.getElementById("map"),{
        center: {lat: 38.6270, lng: -90.1994},
        zoom: 10,
      })

    addmarker({lat: 38.80505, lng: -90.32967})
    addmarker({lat: 38.81834, lng: -90.47679})
    addmarker({lat: 38.80443, lng: -90.57636})
    
    

      function addmarker(coords={}){
        let marker = new google.maps.Marker({
        position:coords,
        map: map,
        icon: shelterIcon
      });  
      }
    })
  }
}
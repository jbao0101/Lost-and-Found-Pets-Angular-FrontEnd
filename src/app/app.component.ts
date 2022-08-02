import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'google-maps';

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyAVUb8DbYfWr3ylaxt5hMIuhmZeBeSfiJM'
    })

    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map"),{
        center: {lat: 38.6270, lng: -90.1994},
        zoom: 10,
      })
    })
  }
}
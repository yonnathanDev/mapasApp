import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Map, Popup, Marker } from 'mapbox-gl'

import { PlacesService } from '../../services';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(  private placesService: PlacesService,
                private mapService: MapService) { }
  
  
  ngAfterViewInit(): void {

    if ( !this.placesService.userLocation ) throw Error('No hay placesService.userLocation');
   
    const map = new Map({
        container: this.mapDivElement.nativeElement,
        // style: 'mapbox://styles/mapbox/streets-v11', // style URL
        style: 'mapbox://styles/mapbox/dark-v10', // style URL 
        center: this.placesService.userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
    });

    const popup = new Popup()
          .setHTML(`
            <h6>Aquí estoy</6>
            <span>Estoy en este lugar del mundo</span>
          `);
    
    new Marker({ color: 'red'})
          .setLngLat( this.placesService.userLocation )
          .setPopup( popup )
          .addTo( map )
    
    this.mapService.setMap( map );



  }

  

}

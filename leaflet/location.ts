import {component} from '@angular/core';

declare const L: any;

export class AppComponent implements OnInIt{

    ngOnInIt(){
        if(!navigator.geolocation){
            console.log('Location is not supported');
        }
        navigator.geolocation.getCurrentPosition((position) =>{
            const coords = position.coords;
            const latlng = [coords.latitude, coords.longitude]
            console.log(
                'lat: ${position.coords.latitude}, lon: ${position.coords.longitude}'
            );

            let mymap = L.map('map').setView([latlng], 13)

            let marker = L.marker(latlng).addTo(mymap);
        });
        this.watchPosition();
    }
    watchPosition(){
        let desLat = 0;
        let desLon = 0;
        let id = navigator.geolocation.watchPosition((position) => {
            console.log(
                'lat: ${position.coords.latitude}, lon: ${position.coords.longitude}'
            );

             if(position.coords.latitude === desLat){
                 navigator.geolocation.clearWatch(id);
             }

        }),(err: any) => {
            console.log(err);
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    }

}
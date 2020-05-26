import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { RestaurantsService } from 'src/app/services/restaurants.service';
@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit {
	constructor(private restaurantService: RestaurantsService) {}
	@ViewChild(GoogleMap) map: GoogleMap;
	@ViewChild(MapInfoWindow) info: MapInfoWindow;
	myStyles = [
		{
			featureType: 'poi',
			elementType: 'labels',
			stylers: [ { visibility: 'off' } ]
		}
	];
	zoom = 12;
	center: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
		zoomControl: true,
		scrollwheel: false,
		disableDoubleClickZoom: false,
		mapTypeId: 'roadmap',
		styles: [
			{
				featureType: 'poi',
				elementType: 'labels',
				stylers: [ { visibility: 'off' } ]
			}
		],
		maxZoom: 15,
		minZoom: 8
	};
	markers = [];
	InfoContent = {
		Meniu: '',
		ImgUrl: ''
	};

	ngOnInit() {
		this.restaurantService.getRestaurants().pipe().subscribe((data) => {
			let restaurante = Object.keys(data).map((i) => data[i]);
			restaurante.forEach((element) => {
				let specialitati = '';
				element.Specialitate.forEach((element) => {
					specialitati += `${element} `;
				});
				this.markers.push({
					position: {
						lat: element.lat,
						lng: element.long
					},
					label: {
						color: 'black',
						text: element.Name
					},
					title: element.Name,
					// info:
					//  `<img src=${element.ImgUrl} width="400" height="400">
					// <p>Meniu:${specialitati}</p>`
					info: {
						ImgUrl: element.ImgUrl,
						Meniu: specialitati
					}
				});
			});
		});

		navigator.geolocation.getCurrentPosition((position) => {
			this.center = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		});
	}

	openInfo(marker: MapMarker, content) {
		console.log(content);
		this.InfoContent = content;
		this.info.open(marker);
	}
}

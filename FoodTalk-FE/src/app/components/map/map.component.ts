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
	infoContent = '';

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
					info: `<img src=${element.ImgUrl} width="400" height="400">
					<p>Meniu:${specialitati}</p>`
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

	addMarker() {
		this.markers.push({
			position: {
				lat: this.center.lat + (Math.random() - 0.5) * 2 / 10,
				lng: this.center.lng + (Math.random() - 0.5) * 2 / 10
			},
			label: {
				color: 'red',
				text: 'Marker label ' + (this.markers.length + 1)
			},
			title: 'Marker title ' + (this.markers.length + 1),
			info: 'Marker info ' + (this.markers.length + 1),
			options: {
				animation: google.maps.Animation.BOUNCE
			}
		});
	}

	openInfo(marker: MapMarker, content) {
		this.infoContent = content;
		this.info.open(marker);
	}
}

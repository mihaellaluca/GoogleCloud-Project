import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class RestaurantsService {
	constructor(private http: HttpClient) {}

	getRestaurants() {
		let restaurante = this.http.get('https://us-central1-astral-bit-278316.cloudfunctions.net/getRestaurants');
		return restaurante;
	}
}

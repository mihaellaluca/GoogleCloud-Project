import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	constructor() {}
	users = [
		{
			displayName: 'Robert Tataru',
			email: 'robert@gmail.com',
			photoUrl:
				'https://lh6.googleusercontent.com/-FtfAqmIDu_8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnwee9o5l03SRsgV5y8UkNmEmgCGg/photo.jpg',
			prefFood: [ 'sea fruits', 'greek salad' ],
			prefRestaurants: [ 'oscar' ],
			prefSpecific: [ 'mediteranean' ]
		}
	];
	ngOnInit(): void {
		console.log(this.users[0]);
	}
}

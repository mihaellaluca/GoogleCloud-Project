import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	constructor(private http: HttpClient, private authService: AuthService) {}
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
		this.authService.user$.pipe().subscribe((data) => {
			this.http
				.get('https://us-central1-astral-bit-278316.cloudfunctions.net/getUserbyEmail/' + data['email'])
				.pipe()
				.subscribe((data) => {
					console.log(data);
					let userProfile = Object.keys(data).map((i) => data[i]);
					let uid = userProfile[0].uid;
					this.http
						.get(
							`
          https://us-central1-astral-bit-278316.cloudfunctions.net/getNearestUsers/${uid}`
						)
						.pipe()
						.subscribe((data) => {
							this.users = Object.keys(data).map((i) => data[i]);
						});
				});
		});
	}
}

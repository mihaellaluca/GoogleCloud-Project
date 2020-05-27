import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-suggetions-tab',
	templateUrl: './suggetions-tab.component.html',
	styleUrls: [ './suggetions-tab.component.scss' ]
})
export class SuggetionsTabComponent implements OnInit {
	@Input() user;
	constructor() {}

	ngOnInit(): void {
		console.log(this.user);
	}
}

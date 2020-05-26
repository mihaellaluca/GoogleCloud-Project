import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  restaurants = ['Mamamia', 'Dionisios', 'Hellow'];
  food = ['pizza', 'burger', 'salad'];
  countries = ['Italy', 'Germany'];


  constructor() { }

  ngOnInit(): void {
  }

}

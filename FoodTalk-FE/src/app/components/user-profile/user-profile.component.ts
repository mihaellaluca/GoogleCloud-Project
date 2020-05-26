import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../services/auth/auth.service';
import { UserProfileService } from './../../services/user-profile/user-profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  restaurants = ['Mamamia', 'Dionisios', 'Hellow'];
  food = ['pizza', 'burger', 'salad'];
  cuisines = ['Italy', 'Germany'];
  chosenRestaurants = [];
  chosenFood = [];
  chosenCuisines = [];
  userProfile;

  constructor(private authService: AuthService, private httpClient: HttpClient) {

    // authService.user$.pipe().subscribe((data)=>{

    // httpClient.get("https://us-central1-astral-bit-278316.cloudfunctions.net/getUserbyEmail/"+data["email"])
    //                               .pipe()
    //                               .subscribe((data)=> {
    //                                 console.log(data);
    //                                 this.favoriteFoods = data['prefFood']});

    //    }
    // );

  }

  ngOnInit(): void {


  }
  onSubmit(){

  }
  addFood(chekedFood: string){
    this.chosenFood.push(chekedFood);
  }

}

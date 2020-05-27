import { HttpClient } from "@angular/common/http";
import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  restaurants = [];
  food = ["Pizza", "Burger", "Salad", "Chicken Salad"];
  cuisines = ["Asian", "Mediteanean","Italian", "Romanian"];


  prefFood = [];
  prefRestaurants = [];
  prefSpecific = [];
  userDisplayName;
  imgUrl;

  form: FormGroup;


  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {
    this.getRestaurants();
    this.updateUserPreferences();
    this.form = this.fb.group({
      checkedCuisines: this.fb.array([], [Validators.required]),
      checkedRestaurants: this.fb.array([], [Validators.required]),
      checkedFood: this.fb.array([], Validators.required)
    })

  }
  onCheckedRestaurant(e){
    const checkArray: FormArray = this.form.get('checkedRestaurants') as FormArray;
   this.onCheckboxChange(e, checkArray);
  }
  onCheckedCuisine(e){
    const checkArray: FormArray = this.form.get('checkedCuisines') as FormArray;
    this.onCheckboxChange(e, checkArray);
  }
  onCheckedFood(e){
    const checkArray: FormArray = this.form.get('checkedFood') as FormArray;
    this.onCheckboxChange(e, checkArray);
  }
  onCheckboxChange(e, checkArray ){
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void {}


  onSubmit() {
    console.log(this.form.value);
    this.authService.user$.pipe().subscribe((data) => {
      let body = {
        prefFood: this.form.value.checkedFood,
        prefRestaurant: this.form.value.checkedRestaurants,
        prefSpecific: this.form.value.checkedCuisines
      };
      console.log(body);
      let jsonBody = JSON.stringify(body);
      this.httpClient.post("https://us-central1-astral-bit-278316.cloudfunctions.net/modifyProfile/"+data["uid"], jsonBody).pipe()
      .subscribe((data)=> console.log(data))
    });
    window.alert("Your was modified");
    this.updateUserPreferences();
  }




  getRestaurants(){
    this.httpClient.get("https://us-central1-astral-bit-278316.cloudfunctions.net/getRestaurants").pipe()
    .subscribe((data)=> {
      let parsedData = Object.keys(data).map((i) => data[i]);
      parsedData.forEach((restaur)=> {console.log(restaur);this.restaurants.push(restaur["Name"]);})
    });
  }

  updateUserPreferences(){
    this.authService.user$.pipe().subscribe((data) => {
      this.httpClient
        .get(
          "https://us-central1-astral-bit-278316.cloudfunctions.net/getUserbyEmail/" +
            data["email"]
        )
        .pipe()
        .subscribe((data) => {
          console.log(data);
          let userProfile = Object.keys(data).map((i) => data[i]);
          this.prefFood = userProfile[0].prefFood;
          this.prefRestaurants = userProfile[0].prefRestaurants;
          this.prefSpecific = userProfile[0].prefSpecific;
          this.userDisplayName = userProfile[0].displayName;
          this.imgUrl = userProfile[0].photoURL
          console.log(this.imgUrl);
        });
    });
  }

}

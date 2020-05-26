import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { RestaurantsService } from "src/app/services/restaurants.service";
import { MailsService } from "src/app/services/mails.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  bookForm: FormGroup;
  loading = false;
  submitted = false;
  availableRestaurants = [];
  availableIntervals = [];

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantsService,
    private mailService: MailsService
  ) {}

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      name: ["", Validators.required],
      restaurants: [""],
      intervals: [""],
    });

    this.restaurantService
      .getRestaurants()
      .pipe()
      .subscribe((data) => {
        var restaurants = Object.keys(data).map((i) => data[i]);
        restaurants.forEach((rest) => {
          this.availableRestaurants.push(rest);
          for (let i = 0; i < rest.Avail.length; i++) {
            let interv = rest.Avail[i].Interval;
            let counter = rest.Avail[i].NumberAvailableSeats;
            if (counter > 0) {
              this.availableIntervals.push(interv);
            }
          }
        });
      });
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      console.log(this.bookForm.invalid);
      return;
    }
    let name = this.f.name.value;
    let rest = this.f.restaurants.value;
    let interval = this.f.intervals.value;
    this.bookForm.reset();

    let restEmail = this.searchRestaurantEmail(this.availableRestaurants, rest);
    let array =[];
    array.push(restEmail);
    let body = {
      name: name,
      interval: interval,
      email: array
    };
   
    let response = this.mailService
      .sendMailToRestaurant(body)
      .pipe()
      .subscribe((data) => console.log(data));
  
    window.alert("Succesfully booked a table!");
  }

  searchRestaurantEmail(availableRestaurants, restName) {
    for (let i = 0; i < availableRestaurants.length; i++) {
      if (availableRestaurants[i].Name === restName) {
        return availableRestaurants[i].email;
      }
    }
  }
}

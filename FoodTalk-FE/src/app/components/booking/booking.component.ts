import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  bookForm: FormGroup;
  loading = false;
  submitted = false;
  availableRestaurants = [
    { id: "123", name: "Oscar" },
    { id: "234", name: "Felix" },
  ];
  availableIntervals = ["10-12", "12-14"];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      name: ["", Validators.required],
      restaurants: [""],
      intervals: [""],
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
    console.log(this.bookForm, name, rest, interval);
    window.alert("Succesfully booked a table!");
    this.bookForm.reset();
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth/auth.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  users = [];
  ngOnInit(): void {
    this.authService.user$.pipe().subscribe((data) => {
      this.http
        .get(
          "https://us-central1-astral-bit-278316.cloudfunctions.net/getUserbyEmail/" +
            data["email"]
        )
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

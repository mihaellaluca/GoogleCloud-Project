import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MailsService {
  constructor(private http: HttpClient) {}

  sendMailToRestaurant(body) {
    const headers = { "Content-Type": "application/json" };
    console.log("JSONNUL", JSON.stringify(body));
    let jsonu = JSON.stringify(body);
    let response = this.http.post(
      "https://us-central1-astral-bit-278316.cloudfunctions.net/sendMailToRestaurant",
      jsonu
    );
    return response;
  }
}

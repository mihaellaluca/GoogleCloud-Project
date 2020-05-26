import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo = "Logo";
  navbarOpen = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}

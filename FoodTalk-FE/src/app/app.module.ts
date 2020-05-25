import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BookingComponent } from './components/booking/booking.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';

@NgModule({
	declarations: [ AppComponent, HeaderComponent, BookingComponent, MapComponent ],
	imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, GoogleMapsModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

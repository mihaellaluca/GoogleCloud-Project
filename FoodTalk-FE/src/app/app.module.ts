import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BookingComponent } from './components/booking/booking.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';

import { AuthService } from './services/auth/auth.service';
// ...omitted
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SuggetionsTabComponent } from './components/suggetions-tab/suggetions-tab.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from '../app/components/chat/chat.component';

const config = {
	apiKey: 'AIzaSyD4Gupl0obJnBa5K9HHDlhAglKkH2W25sw',
	authDomain: 'astral-bit-278316.firebaseapp.com',
	databaseURL: 'https://astral-bit-278316.firebaseio.com/',
	projectId: 'astral-bit-278316',
	storageBucket: 'astral-bit-278316.appspot.com',
	messagingSenderId: '655163274876',
	appId: '1:655163274876:web:f0558d95983c919225fbf9',
	measurementId: 'G-XERHT73D69'
};

@NgModule({
	declarations: [ AppComponent, HeaderComponent, BookingComponent, MapComponent, SuggetionsTabComponent, HomeComponent, ChatComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(config),
		AngularFirestoreModule,
		AngularFireAuthModule,
		GoogleMapsModule,
		HttpClientModule
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

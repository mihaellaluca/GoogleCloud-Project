import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { MapComponent } from './components/map/map.component';

import { HomeComponent } from './components/home/home.component';
import { ChatComponent} from './components/chat/chat.component';


const routes: Routes = [

	{ path: 'booking-component', component: BookingComponent,canActivate: [AuthGuard] },
  { path: 'map-component', component: MapComponent,canActivate: [AuthGuard] },
  {path: 'user-profile-component', component: UserProfileComponent, canActivate: [AuthGuard]},
	{ path: 'home-component', component: HomeComponent, canActivate: [ AuthGuard ] }
	{ path: 'chat-component', component: ChatComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: 'booking-component', component: BookingComponent, canActivate: [ AuthGuard ] },
	{ path: 'map-component', component: MapComponent, canActivate: [ AuthGuard ] },
	{ path: 'home-component', component: HomeComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}

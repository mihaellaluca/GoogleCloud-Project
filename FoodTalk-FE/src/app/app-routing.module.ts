import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
	{ path: 'booking-component', component: BookingComponent },
	{ path: 'map-component', component: MapComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}

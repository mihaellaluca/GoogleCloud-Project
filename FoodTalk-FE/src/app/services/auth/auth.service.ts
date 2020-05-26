import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';

import { User } from '../../user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
<<<<<<< HEAD
import { switchMap, first} from 'rxjs/operators';
=======
import { switchMap, first, map } from 'rxjs/operators';
>>>>>>> Chat

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
       

    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
    }

<<<<<<< HEAD
    
=======
    getUser() {
      return this.user$.pipe(first()).toPromise();
    }
>>>>>>> Chat

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }

    private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      
      var center: google.maps.LatLngLiteral;
      navigator.geolocation.getCurrentPosition((position) => {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var data = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          center: center
        }
        return userRef.set(data, { merge: true })
      });
      

    
    }

    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }

}

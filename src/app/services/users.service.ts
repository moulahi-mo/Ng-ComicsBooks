import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from '../models/interfaces';
import { catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private Afirestore: AngularFirestore,
    private router: Router
  ) {
    //! Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.Afirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  // ! Google sign in

  public async googleSignin() {
    const provider = await new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.returnNewSocialUser(credential);
  }

  //! set new social user
  public returnNewSocialUser(credential: any) {
    const newSocialUser = {
      uid: credential.user.uid,
      name: credential.user.displayName,
      email: credential.user.email,
      joind_date: new Date(),
    };
    this.addNewUser(newSocialUser)
      .pipe(catchError(this.HundleErrors))
      .subscribe((data) => data);

    return newSocialUser;
  }

  // ! Sign in with Facebook
  public async FacebookAuth() {
    const provider = await new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.returnNewSocialUser(credential);
  }

  //! add new user
  public addNewUser(user: User) {
    return from(this.Afirestore.doc(`users/${user.uid}`).set(user)).pipe(
      catchError(this.HundleErrors)
    );
  }
  //! fetch user by uid
  public getUserById(uid: string): Observable<any> {
    return this.Afirestore.doc(`users/${uid}`)
      .valueChanges()
      .pipe(catchError(this.HundleErrors));
  }

  //! hundling errors
  private HundleErrors(error: HttpErrorResponse) {
    let err = 'Something bad happned !!';
    if (error) {
      return throwError(
        error.error?.message ? error.error?.message : error?.message
      );
    } else {
      return throwError(err);
    }
  }
}

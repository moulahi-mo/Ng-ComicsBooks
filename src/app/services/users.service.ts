import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, throwError } from 'rxjs';
import { User } from '../models/interfaces';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private Afirestore: AngularFirestore) {}
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
        error.error.message ? error.error.message : error.message
      );
    } else {
      return throwError(err);
    }
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth/auth.action';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private store: Store) {}

  public signUp(email: string, pass: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }
  public logout() {
    return this.fireAuth.signOut();
  }

  public login(email: string, pass: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }
  //! auth listner if user is auth or not
  public authState(): Observable<any | null> {
    return this.fireAuth.user.pipe(
      tap((user) => {
        if (user.uid) {
          //* on login success dispatch state to store
          this.store.dispatch(authActions.login());
        } else {
          //* on login success dispatch state to store
          this.store.dispatch(authActions.logout());
        }
      }),
      catchError(this.HundleErrors)
    );
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

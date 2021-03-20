import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth/auth.action';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/interfaces';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currUser: User;
  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store,
    private Cservice: UsersService
  ) {}

  public signUp(email: string, pass: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }
  public login(email: string, pass: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }
  public logout() {
    return this.fireAuth.signOut();
  }
  public getCurrUser() {
    return this.currUser ? this.currUser : null;
  }

  public isAuth() {
    return;
  }

  //! auth listner if user is auth or not
  public authCheck() {
    this.fireAuth.authState.pipe(catchError(this.HundleErrors)).subscribe(
      (user) => {
        if (user) {
          this.store.dispatch(authActions.login({ uid: user.uid }));
          this.Cservice.getUserById(user.uid).subscribe((user: User) => {
            console.log(user);
            this.currUser = user;
          });
          console.log('logged in', user);
        } else {
          this.store.dispatch(authActions.logout());
          this.currUser = null;
          console.log('logout');
        }
      },
      (err) => console.log(err)
    );
  }

  public AuthChange() {
    this.fireAuth.user.subscribe((user) => {
      if (user) {
        this.Cservice.getUserById(user.uid).subscribe((user: User) => {
          console.log(user);
        });

        this.store.dispatch(authActions.login({ uid: user.uid }));
      } else {
        this.store.dispatch(authActions.logout());
      }
    });
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

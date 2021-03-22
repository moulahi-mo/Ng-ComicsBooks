import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth/auth.action';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/interfaces';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid$: Observable<string>;
  currUser: User;
  idUser: string;
  UserInfos = new BehaviorSubject<User>(null);
  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store<{ auth: string }>,
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
  public getCurrUserUid(): string | null {
    this.uid$ = this.store.select('auth');
    this.uid$.subscribe(
      (uid) => {
        console.log(uid);
        this.idUser = uid;
      },
      (err) => null
    );
    return this.idUser ? this.idUser : null;
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
            this.UserInfos.next({ ...user });
            this.currUser = user;
          });
          console.log('logged in', user);
        } else {
          this.store.dispatch(authActions.logout());
          this.currUser = null;
          this.UserInfos.next(null);
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

  public getUser() {
    return this.currUser;
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

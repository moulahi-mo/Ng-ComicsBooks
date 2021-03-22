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

  public async signUp(email: string, pass: string) {
    return await this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }
  public async login(email: string, pass: string) {
    return await this.fireAuth.signInWithEmailAndPassword(email, pass);
  }
  public async logout() {
    return await this.fireAuth.signOut();
  }

  //! auth listner if user is auth or not
  public async authCheck() {
    this.fireAuth.authState.pipe(catchError(this.HundleErrors)).subscribe(
      (user) => {
        if (user) {
          this.store.dispatch(authActions.login({ uid: user.uid }));
          console.log(user);
          this.getUser(user);
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

  // ! get logged in user
  public getUser(user: any) {
    ///* if social user
    if (user.displayName) {
      this.currUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      };
      this.UserInfos.next({ ...this.currUser });
      return this.currUser;
    } else if (user.displayName == null) {
      ///* if regular user
      this.Cservice.getUserById(user.uid).subscribe((user: User) => {
        console.log(user);
        this.UserInfos.next({ ...user });
        return user;
      });
    }
  }
  // !get user Uid
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

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comic } from '../models/interfaces';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  uid: string = this.auth.getCurrUserUid();
  constructor(
    private Afirestore: AngularFirestore,
    private auth: AuthService
  ) {}

  //! add new comic
  public addNewFavorite(comic: Comic): Observable<any> {
    //* getting the current creator uid before adding the new comic
    const uid = this.auth.getCurrUserUid();

    const favoriteWithUser = { ...comic, uid };
    return from(
      // * set document id = creator uid + comic id
      this.Afirestore.collection(`favorites`).add(favoriteWithUser)
    ).pipe(catchError(this.HundleErrors));
  }

  //! get all personal comics
  public getAllFavorites(): Observable<any[]> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.collection('favorites', (ref) =>
        //! fetch only the favorites with the same uid / the currrent auth user not other users
        ref.where('uid', '==', uid)
      ).valueChanges()
    ).pipe(catchError(this.HundleErrors));
  }

  //! remove comic by id
  public removeFavorite(favoriteId: string): Observable<any> {
    return from(this.Afirestore.doc(`favorites/${favoriteId}`).delete()).pipe(
      catchError(this.HundleErrors)
    );
  }

  //! hundling errors
  private HundleErrors(error: HttpErrorResponse) {
    let err = 'Something bad happned !!';
    if (error) {
      return throwError(
        error.error?.message ? error.error?.message : error.message
      );
    } else {
      return throwError(err);
    }
  }
}

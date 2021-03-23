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
export class MyComicsService {
  uid: string = this.auth.getCurrUserUid();
  constructor(
    private Afirestore: AngularFirestore,
    private auth: AuthService
  ) {}

  //! add new comic
  public addNewComic(comic: Comic): Observable<any> {
    //* getting the current creator uid before adding the new comic
    const uid = this.auth.getCurrUserUid();

    const comicWithUser = { ...comic, uid };
    return from(
      // * set document id = creator uid + comic id
      this.Afirestore.doc(`comics/${uid}${comic.id}`).set(comicWithUser)
    ).pipe(catchError(this.HundleErrors));
  }

  //! get all personal comics
  public getAllComics(): Observable<any[]> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.collection('comics', (ref) =>
        //! fetch only the comics with the same uid / the currrent auth user not other users
        ref.where('uid', '==', uid)
      ).valueChanges()
    ).pipe(catchError(this.HundleErrors));
  }

  //! remove comic by id
  public removeComic(comicId: string): Observable<any> {
    return from(this.Afirestore.doc(`comics/${comicId}`).delete()).pipe(
      catchError(this.HundleErrors)
    );
  }

  //! get mycomic by id
  public getComicById(comicId: string): Observable<any> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.doc(`comics/${uid + comicId}`).valueChanges()
    ).pipe(catchError(this.HundleErrors));
  }

  //! edit mycomic
  public editComic(comic: Comic): Observable<any> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.doc(`comics/${uid + comic.id}`).update(comic)
    ).pipe(catchError(this.HundleErrors));
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

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
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
    console.log(this.uid);
    const comicWithUser = { ...comic, uid };
    return from(this.Afirestore.collection(`comics`).add(comicWithUser)).pipe(
      catchError(this.HundleErrors)
    );
  }

  //! get all personal comics
  public getAllComics(): Observable<any[]> {
    return from(this.Afirestore.collection('comics').valueChanges()).pipe(
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

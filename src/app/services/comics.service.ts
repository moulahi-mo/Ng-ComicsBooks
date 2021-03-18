import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Comic } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  url: string = 'http://gateway.marvel.com/v1/public/comics';
  apiKey: string = environment.apiKey;
  constructor(private http: HttpClient) {}
  //! fetch all commics (limit 20 items)
  public getComics(): Observable<any> {
    return this.http.get<Comic[]>(this.url + '?' + this.apiKey).pipe(
      // map((data: any) => {
      //   let res: any = null;
      //   res = data.data.results;
      //   console.log(res);
      //   const mapped = {
      //     id: res.id,
      //     format: res.format,
      //     pageCount: res.pageCount,
      //     title: res.title,
      //     price: res.prices[0].price,
      //     date: res.dates[0].date,
      //     cover: res.thumbnail.path.concat(
      //       '/portrait_incredible.',
      //       res.thumbnail.extension
      //     ),
      //     owner: res.creators.items[0].name,
      //     condition: 'good',
      //     characters: {
      //       count: res.characters.available,
      //       items: res.characters.items,
      //     },
      //   };
      //   console.log(mapped);
      //   return mapped;
      // }),

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

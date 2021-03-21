import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character, Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ComicsService } from 'src/app/services/comics.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  isAuth$: Observable<string>;
  comics: Comic[] = [];
  character: Character;
  isloading: boolean = false;
  isError: string = null;
  isFetched: boolean = false;
  isNoData: boolean = false;
  uid: string;
  isCreator: boolean;
  myComicsList: Comic[] = [];
  constructor(
    private comicsService: ComicsService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private myComics: MyComicsService,
    private store: Store<{ auth: string }>
  ) {}

  ngOnInit(): void {
    //! check if curr user is the creator of comics
    this.auth.getCurrUserUid()
      ? (this.isCreator = true)
      : (this.isCreator = false);
    this.character = {
      id: null,
      image: null,
      name: null,
    };
    //! check if user is auth
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe(
      (uid) => {
        if (uid) {
          //* if user auth ok fetch my comics after login
          if (this.myComicsList.length <= 0) {
            this.fetchMyComics();
          }
        }
      },
      (err) => console.log(err)
    );
    // ! init listing of comics
    this.getlocalComics();
  }

  ngAfterContentChecked() {
    this.isFetched = true;
  }
  //! get cached comics or from api if no cache found
  private getlocalComics() {
    const myComics = this.localService.getItem('comics');

    // this.comics = [...this.localService.getItem('comics'), ...myComics];
    // //* filtring list from any double comic
    // const temporary = this.comics;
    // const filtredFavorites = this.comics.filter((comic) => {
    //   for (let item of temporary) {
    //     return comic.id !== item.id;
    //   }
    // });
    // this.comics = filtredFavorites;
    this.comics = myComics;
    if (myComics.length <= 0) {
      this.fetchComics();
    }
  }

  //! fetch my comics {
  public fetchMyComics() {
    this.myComics.getAllComics().subscribe(
      (myComics: Comic[]) => {
        console.log(myComics);
        this.myComicsList = myComics;
        this.comics = [...this.comics, ...this.myComicsList];
        const temporary = this.comics;
        const filtredFavorites = this.comics.filter((comic) => {
          for (let item of temporary) {
            return comic.id !== item.id;
          }
        });
        this.comics = filtredFavorites;

        // this.localService.setItem('myComics', this.myComicsList);
      },
      (err) => {
        this.isloading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }

  // ! fetch comics
  public fetchComics() {
    this.isError = null;
    this.isloading = true;
    this.comicsService.getComics().subscribe(
      (list: any) => {
        this.comics = list;
        this.myComics.getAllComics().subscribe(
          (myComics: Comic[]) => {
            this.myComicsList = myComics;
            this.comics = [...list, ...myComics];
            this.isloading = false;
            console.log(this.comics);
            this.localService.setItem('comics', this.comics);
            // this.localService.setItem('myComics', this.myComicsList);
          },
          (err) => {
            this.isloading = false;
            this.isError = err;
            console.log(err);
          }
        );
      },
      (err) => {
        this.isloading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }
  //! on search
  public onSearchComic(comicsByTile: Comic[]) {
    if (comicsByTile.length > 0) {
      this.comics = comicsByTile;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
  //!on order
  public onOrderComic(comicsByOrder: Comic[]) {
    if (comicsByOrder.length > 0) {
      this.comics = comicsByOrder;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
  //!on quantity
  public onQuantityComic(comicsByQuantity: Comic[]) {
    if (comicsByQuantity.length > 0) {
      this.comics = [...comicsByQuantity, ...this.myComicsList];
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
  //! on select character
  public onSingleCharacterSelected(selectedComic: {
    character: Character;
    comics: Comic[];
  }) {
    console.log(selectedComic);
    this.comics = selectedComic.comics;
    this.character = selectedComic.character;
  }
}

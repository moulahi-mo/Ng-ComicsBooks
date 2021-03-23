import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character, Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ComicsService } from 'src/app/services/comics.service';
import { FiltersServiceService } from 'src/app/services/filters-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
  limit: number = 20;
  skip: number = 0;
  constructor(
    private comicsService: ComicsService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private myComics: MyComicsService,
    private store: Store<{ auth: string }>,
    private filterService: FiltersServiceService
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

  //! get cached comics or from api if no cache (local storage) found
  private getlocalComics() {
    const myComics = this.localService.getItem('comics');
    this.comics = myComics;
    // * if the local storage list is empty fire fetching
    if (myComics.length <= 0) {
      this.fetchComics();
    }
  }

  //! fetch my comics from firebase db
  public fetchMyComics() {
    this.myComics.getAllComics().subscribe(
      (myComics: Comic[]) => {
        this.myComicsList = myComics;
        //* add my comics list to home page list of comics
        this.comics = [...this.comics, ...this.myComicsList];
        const temporary = this.comics;
        //* filter the comics list from doubles
        const filtredFavorites = this.comics.filter((comic) => {
          for (let item of temporary) {
            return comic.id !== item.id;
          }
        });
        this.comics = filtredFavorites;
      },
      (err) => {
        this.isloading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }

  // ! fetch comics from Marvel API
  public fetchComics() {
    this.isError = null;
    this.isloading = true;
    //* fetch from A¨PI
    this.comicsService.getComics().subscribe(
      (list: any) => {
        this.comics = list;
        //* store list on local storage for cahe
        this.localService.setItem('comics', this.comics);
        this.isloading = false;
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
  //! on selected character
  public onSingleCharacterSelected(selectedComic: {
    character: Character;
    comics: Comic[];
  }) {
    this.comics = selectedComic.comics;
    this.character = selectedComic.character;
  }

  //!  on scrolling lazy loading
  public onScroll() {
    this.skip += this.limit;
    console.log('is loading');
    this.filterService
      .getComicsByLazyLoading(this.limit, this.skip)
      .subscribe((comics: Comic[]) => {
        this.isFetched = true;
        this.comics = [...this.comics, ...comics];
      });
  }
}

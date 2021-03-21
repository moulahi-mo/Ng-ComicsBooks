import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

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
  comics: Comic[] = [];
  character: Character;
  isloading: boolean = false;
  isError: string = null;
  isFetched: boolean = false;
  isNoData: boolean = false;
  uid: string;
  isCreator: boolean;
  constructor(
    private comicsService: ComicsService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private myComics: MyComicsService
  ) {}

  ngOnInit(): void {
    //! check if user is auth
    this.auth.getCurrUserUid()
      ? (this.isCreator = true)
      : (this.isCreator = false);
    this.character = {
      id: null,
      image: null,
      name: null,
    };
    this.getlocalComics('comics');
  }

  ngAfterContentChecked() {
    this.isFetched = true;
  }
  //! get cached comics or from api if no cache found
  private getlocalComics(item) {
    this.comics = this.localService.getItem(item);
    if (this.comics.length <= 0) {
      this.fetchComics();
    }
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
            this.comics = [...list, ...myComics];
            this.isloading = false;
            console.log(this.comics);
            this.localService.setItem('comics', this.comics);
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
  public onQuantityComic(comicsByOrder: Comic[]) {
    if (comicsByOrder.length > 0) {
      this.comics = comicsByOrder;
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

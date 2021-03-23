import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
})
export class ComicCardComponent implements OnInit {
  @Input() comic: Comic;
  @Input() isCreator: boolean;
  @Input() page: string;
  isAuth$: Observable<string>;
  uid: string = null;
  isInit: boolean = true;
  isToast: boolean = false;
  isBuyOrFav: 'fav' | 'buy';
  isEdited: boolean = false;
  isOnRemove: boolean = false;
  constructor(
    private myComicService: MyComicsService,
    private auth: AuthService,
    private store: Store<{ auth: string }>
  ) {}

  ngOnInit(): void {
    this.AuthListener();
    this.checkCreator();
  }
  //! check curr user is the creator of this card
  public checkCreator() {
    this.uid = this.auth.getCurrUserUid();
    if (
      this.comic.uid &&
      this.uid === this.comic.uid &&
      this.page != 'favorites'
    ) {
      this.isCreator = true;
    } else {
      this.isCreator = false;
    }
  }

  //! listen to auth state
  public AuthListener() {
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe((id: string) => {
      if (id) {
        this.isInit = false;
        console.log(id);
      } else {
        this.isInit = false;
        console.log('no user found');
      }
    });
  }
  //! store edited comic into firebase db
  public onComicEdited(comicEdited: Comic) {
    console.log('from card', comicEdited);

    if (comicEdited.id) {
      this.myComicService.editComic(comicEdited).subscribe(
        (data: any) => {
          this.comic = comicEdited;
          console.log(data, 'comic edited success successfully');
        },
        (err) => console.log(err)
      );
    }
  }
  // ! toast actions Buy
  public onBuyClicked(id: string) {
    this.isBuyOrFav = 'buy';
    if (id == this.comic.id) {
      this.isToast = true;
    }
  }
  // ! toast actions favorite
  public onFavClicked(id: string) {
    this.isBuyOrFav = 'fav';
    if (id == this.comic.id) {
      this.isToast = true;
    }
  }
  // ! toast actions on toast closed
  public onCloseToast() {
    this.isToast = false;
  }

  // * toast add / edit / remove Modals (on close/on click)  states hundlers

  public onEditClicked() {
    this.isEdited = true;
  }

  public onCloseModalEdit() {
    this.isEdited = false;
  }
  public onCloseModalRemove() {
    this.isOnRemove = false;
  }

  public onRemoveClicked() {
    this.isOnRemove = true;
  }
}

import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comic } from 'src/app/models/interfaces';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorite-buy',
  templateUrl: './favorite-buy.component.html',
  styleUrls: ['./favorite-buy.component.scss'],
})
export class FavoriteBuyComponent implements OnInit {
  @Input() page: string;
  @Output() onBuyClicked: EventEmitter<string> = new EventEmitter();

  isAuth$: Observable<string>;
  isAuth: boolean;
  isFavorite: boolean;
  @Input() comic: Comic;
  constructor(
    private store: Store<{ auth: string }>,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    // $('.showtoast').click(function () {
    //   $('.toast').toast('show');
    // });

    this.checkAuth();
  }

  public checkAuth() {
    //! check if user is auth
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe(
      (uid) => {
        if (uid) {
          //* if user auth ok fetch my comics after login
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      },
      (err) => console.log(err)
    );
  }

  // ! onfavorite add favorite to db
  public onFavorite() {
    delete this.comic.characters;
    console.log(this.comic);
    const favoriteComic = { ...this.comic, favorite_date: new Date() };
    this.favoriteService
      .addNewFavorite(favoriteComic)
      .subscribe((data: any) => {
        console.log('added favorite', data, this.isAuth);
        this.isFavorite = true;
      });
  }
  // ! on buy button clicked
  public onBuy() {
    this.onBuyClicked.emit(this.comic.id);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-comic-more-details',
  templateUrl: './comic-more-details.component.html',
  styleUrls: ['./comic-more-details.component.scss'],
})
export class ComicMoreDetailsComponent implements OnInit {
  @Input() comic: Comic;
  @Input() isCreator: boolean;
  isloading: boolean = false;
  isError: string = null;
  isToast: boolean = false;
  isBuyOrFav: 'fav' | 'buy';

  constructor(private myComicService: MyComicsService) {}

  ngOnInit(): void {}

  public onComicEdited(comicEdited: Comic) {
    comicEdited.pages = comicEdited.pages ? comicEdited.pages : 0;
    //! store it to firebase db
    if (comicEdited.id) {
      this.myComicService.addNewComic(comicEdited).subscribe(
        () => {
          this.comic = comicEdited;
        },
        (err) => console.log(err)
      );
    }
  }

  // ! toast actions

  public onBuyClicked(id: string) {
    this.isBuyOrFav = 'buy';
    if (id == this.comic.id) {
      this.isToast = true;
    }
  }

  public onFavClicked(id: string) {
    this.isBuyOrFav = 'fav';
    if (id == this.comic.id) {
      this.isToast = true;
    }
  }

  public onCloseToast() {
    this.isToast = false;
  }
}

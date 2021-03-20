import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
  comics: Comic[] = [];
  character: Character;
  isloading: boolean = false;
  isError: string = null;
  constructor(private comicsService: ComicsService) {}

  ngOnInit(): void {
    this.character = {
      id: null,
      image: null,
      name: null,
    };

  }
  // public fetchComics() {
  //   this.isError = null;
  //   this.isloading = true;
  //   this.comicsService.getComics().subscribe(
  //     (data: any) => {
  //       let list = data.data.results;

  //       list = list.map((res) => {
  //         this.isloading = false;
  //         return {
  //           id: res.id,
  //           format: res.format,
  //           pages: res.pageCount,
  //           title: res.title,
  //           price: res.prices[0].price,
  //           date: res.dates[0].date,
  //           cover: res.thumbnail.path.concat(
  //             '/portrait_incredible.',
  //             res.thumbnail.extension
  //           ),
  //           owner: res.creators.items[0]?.name,
  //           condition: 'good',
  //           characters: {
  //             count: res.characters.available,
  //             items: res.characters.items,
  //           },
  //         };
  //       });
  //       console.log(list);
  //       this.comics = list;
  //     },
  //     (err) => {
  //       this.isloading = false;
  //       this.isError = err;
  //       console.log(err);
  //     }
  //   );
  // }


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

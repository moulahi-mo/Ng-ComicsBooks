import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  comics: Comic[] = [];
  isloading: boolean = false;
  isError: string = null;
  isFetched: boolean = false;
  isNoData: boolean = false;
  constructor(
    private comicsService: ComicsService,
    private localService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getlocalComics('comics');
  }

  ngAfterContentChecked() {
    this.isFetched = true;
  }

  private getlocalComics(item) {
    this.comics = this.localService.getItem(item);
    if (this.comics.length <= 0) {
      this.fetchComics();
    }
  }

  public fetchComics() {
    this.isError = null;
    this.isloading = true;
    this.comicsService.getComics().subscribe(
      (data: any) => {
        let list = data.data.results;

        list = list.map((res) => {
          this.isloading = false;
          return {
            id: res.id,
            format: res.format,
            pages: res.pageCount,
            title: res.title,
            price: res.prices[0].price,
            date: res.dates[0].date,
            owner: res.creators.items[0]?.name,
            cover: res.thumbnail.path.concat(
              '/portrait_incredible.',
              res.thumbnail.extension
            ),
            condition: 'good',
          };
        });
        console.log(list);
        this.comics = list;
        this.localService.setItem('comics', this.comics);
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
  //!on order
  public onQuantityComic(comicsByOrder: Comic[]) {
    if (comicsByOrder.length > 0) {
      this.comics = comicsByOrder;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
}

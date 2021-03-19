import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';

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

  constructor(private comicsService: ComicsService) {}

  ngOnInit(): void {
    this.fetchComics();
  }

  ngAfterContentChecked() {
    this.isFetched = true;
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
            cover: res.thumbnail.path.concat(
              '/portrait_incredible.',
              res.thumbnail.extension
            ),
            condition: 'good',
          };
        });
        console.log(list);
        this.comics = list;
      },
      (err) => {
        this.isloading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }
  public onScroll(e) {
    console.log(e, 'scrolled');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss'],
})
export class ComicsDetailsComponent implements OnInit {
  isCreator: boolean;
  comic: Comic;
  isloading: boolean;
  isError: string;

  constructor(
    private comicsService: ComicsService,
    private myComicService: MyComicsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //! query a params
    const query = this.route.snapshot.queryParams.creator;
    const id = this.route.snapshot.paramMap.get('id');
    //! check if user is auth (if he is the creator of the comic?)
    this.isCreator = query === 'true' ? true : false;

    //! init values
    this.isError = null;
    this.isloading = false;
    this.comic = {
      id: null,
      format: null,
      pages: null,
      title: null,
      description: null,
      price: null,
      date: null,
      cover: null,
      owner: null,
      condition: null,
      characters: null,
      poster: null,
      pageCount: null,
    };

    this.fetchComicDetails(id);
  }
  //! fetch comic detail depending on :: creator state
  public fetchComicDetails(id: string) {
    this.isError = null;
    this.isloading = true;
    //! if it is my comic get it from firebase db
    if (this.isCreator) {
      this.myComicService.getComicById(id).subscribe(
        (comic: Comic) => {
          this.isloading = false;
          comic.owner = comic.owner ? comic.owner : '';
          this.comic = comic;
        },
        (err) => {
          this.isloading = false;
          this.isError = err;
          console.log(err);
        }
      );
    } else {
      //! if it is an ordinaire  comic get it from firebase Marvel APi
      this.comicsService.getSingleComic(id).subscribe(
        (comic: Comic) => {
          this.isloading = false;
          comic.owner = comic?.owner ? comic?.owner : '';
          this.comic = comic;
        },
        (err) => {
          this.isloading = false;
          this.isError = err;
          console.log(err);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
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
    //! query
    const query = this.route.snapshot.queryParams.creator;
    //! check if user is auth
    this.isCreator = query === 'true' ? true : false;

    this.isError = null;
    this.isloading = false;
    const id = this.route.snapshot.paramMap.get('id');

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
          console.log(this.comic);
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
          // const truncateNames = comic.characters.map((char) => {
          //   const index = char.name.indexOf('(');
          //   if (index > 10) {
          //     return char.name.split('(', 1);
          //   } else {
          //     return char.name;
          //   }
          // });
          // console.log(truncateNames);
          this.isloading = false;
          comic.owner = comic?.owner ? comic?.owner : '';
          this.comic = comic;
          console.log(this.comic);
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

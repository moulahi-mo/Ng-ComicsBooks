import { Component, OnInit } from '@angular/core';
import { Character, Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
  comics: Comic[] = [];
  comic: Comic;
  character: Character;
  isloading: boolean = false;
  isNoData: boolean = false;
  isNotClosed: boolean;
  isError: string = null;
  constructor(
    private comicsService: ComicsService,
    private Mycomics: MyComicsService
  ) {}

  ngOnInit(): void {
    this.isNotClosed = true;
    this.character = {
      id: null,
      image: null,
      name: null,
    };
    this.getPersonalComics();
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

  //! add button new comic
  public onNewComicAdded(newComic: Comic) {
    console.log(newComic);
    this.isNotClosed = false;
    //! store it to firebase db
    if (newComic.id) {
      this.Mycomics.addNewComic(newComic).subscribe(
        (data: any) => {
          console.log('data added successfully');
        },
        (err) => (this.isError = err)
      );
    }
  }
  //! add button new comic
  public getPersonalComics() {
    this.isError = null;
    this.isloading = true;
    this.Mycomics.getAllComics().subscribe(
      (comics: Comic[]) => {
        this.comics = comics;
        this.isloading = false;
      },
      (err) => {
        this.isloading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }
}

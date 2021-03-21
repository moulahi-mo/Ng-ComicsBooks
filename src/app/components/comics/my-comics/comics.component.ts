import { Component, OnInit } from '@angular/core';
import { Character, Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
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
  comicDetailsIsHere: Comic;
  constructor(private Mycomics: MyComicsService) {}

  ngOnInit(): void {
    this.comicDetailsIsHere = {
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
    };
    this.isNotClosed = true;
    this.character = {
      id: null,
      image: null,
      name: null,
    };

    // this.getPersonalComics();
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
          console.log(data, 'data added successfully');
        },
        (err) => (this.isError = err)
      );
    }
  }
  //! get all comics for the user
  public getPersonalComics() {
    this.isError = null;
    this.isloading = true;
    this.Mycomics.getAllComics().subscribe(
      (comics: Comic[]) => {
        console.log(comics);
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

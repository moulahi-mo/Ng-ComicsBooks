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
    //! init values
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
    // !fetch my comics
    this.getPersonalComics();
  }

  //! on search box action
  public onSearchComic(comicsByTile: Comic[]) {
    if (comicsByTile.length > 0) {
      this.comics = comicsByTile;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
  //!on order filter action
  public onOrderComic(comicsByOrder: Comic[]) {
    if (comicsByOrder.length > 0) {
      this.comics = comicsByOrder;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
  //!on quantity filter action
  public onQuantityComic(comicsByOrder: Comic[]) {
    if (comicsByOrder.length > 0) {
      this.comics = comicsByOrder;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }
  //! on select character from the list chars (filter bar)
  public onSingleCharacterSelected(selectedComic: {
    character: Character;
    comics: Comic[];
  }) {
    this.comics = selectedComic.comics;
    this.character = selectedComic.character;
  }

  //! add button new comic by add modal
  public onNewComicAdded(newComic: Comic) {
    this.isNotClosed = false;
    //* store it to firebase db & adding date creation
    if (newComic.id) {
      this.Mycomics.addNewComic({
        ...newComic,
        mycomic_date: new Date(),
      }).subscribe(
        () => {},
        (err) => (this.isError = err)
      );
    }
  }
  //! get all comics only for the current user
  public getPersonalComics() {
    this.isError = null;
    this.isloading = true;
    this.Mycomics.getAllComics().subscribe(
      (comics: Comic[]) => {
        //* sorting by most recent date
        this.comics = [...new Set(comics)].sort(
          (a, b) =>
            new Date(b.mycomic_date).getTime() -
            new Date(a.mycomic_date).getTime()
        );
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

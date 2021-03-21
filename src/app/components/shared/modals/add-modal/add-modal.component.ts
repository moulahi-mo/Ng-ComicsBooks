import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';
import { FiltersServiceService } from 'src/app/services/filters-service.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Output() onNewComicAdded: EventEmitter<Comic> = new EventEmitter();
  @Output() onComicEdited: EventEmitter<Comic> = new EventEmitter();
  @Input() mode: string;
  @Input() comicId: string;
  @Input() comicDetailsIsHere: Comic;

  @Input() page: 'myComics' | 'details';
  comics: Comic[];
  addOptions: {
    price: number;
    condition: string;
    description: string;
  };
  selectedComic: Comic;
  isSearching: boolean;

  isSelected: boolean;
  @Input() id: string;
  constructor(
    private filerService: FiltersServiceService,
    private Mycomics: MyComicsService
  ) {}

  ngOnInit() {
    this.isSearching = false;
    this.isSelected = false;
    this.selectedComic = {
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
    // this.comicDetailsIsHere = {
    //   id: null,
    //   format: null,
    //   pages: null,
    //   title: null,
    //   description: null,
    //   price: null,
    //   date: null,
    //   cover: null,
    //   owner: null,
    //   condition: null,
    //   characters: null,
    //   poster: null,
    // };

    this.addOptions = {
      price: null,
      condition: null,
      description: null,
    };
    this.checkComicIsInMyComicsPage();
  }
  //! check if Comic Is In My Comics Page
  public checkComicIsInMyComicsPage() {
    console.log(this.comicDetailsIsHere);
    if (this.mode == 'edit') {
      //! verify if it is on edit mode ( edit button clicked )

      this.selectedComic = {
        id: this.comicDetailsIsHere.id,
        format: this.comicDetailsIsHere.format,
        pages: this.comicDetailsIsHere.pages,
        title: this.comicDetailsIsHere.title,
        description: this.comicDetailsIsHere.description,
        price: this.comicDetailsIsHere.price,
        date: this.comicDetailsIsHere.date,
        cover: this.comicDetailsIsHere.cover,
        owner: this.comicDetailsIsHere.owner,
        condition: this.comicDetailsIsHere.condition,
        poster: this.comicDetailsIsHere.poster,
      };
      this.addOptions = {
        price: this.comicDetailsIsHere.price,
        condition: this.comicDetailsIsHere.condition,
        description: this.comicDetailsIsHere.description,
      };
      this.isSelected = true;
      this.isSearching = false;

      //   if (this.page == 'details') {
      // } else if (this.page == 'myComics') {
      //   this.getComicToEdit();
      // }
    }
  }

  //! get single comic by id to edit
  public getComicToEdit() {
    this.Mycomics.getComicById(this.comicId).subscribe((comic: Comic) => {
      //* init comic fields

      this.isSearching = false;
      console.log(comic);
      this.selectedComic = comic;
      this.addOptions = {
        price: comic?.price,
        condition: comic?.condition,
        description: comic?.description,
      };
      this.isSelected = true;
    });
  }

  //! on search
  public onSearch(e: Event) {
    const term: string = (e.target as any).value.trim();
    console.log((e.target as any).value);
    term ? (this.isSearching = true) : (this.isSearching = false);
    this.filerService.getComicByTitle(term).subscribe((comics: Comic[]) => {
      console.log(comics);
      this.comics = comics;
    });
  }
  //! on search comic from search show card
  public onSelect(comic: Comic) {
    this.isSearching = false;
    this.isSelected = true;
    console.log(comic);
    this.selectedComic = comic;
  }
  // ! on add commic / Edit comic
  public onSubmit(form: NgForm) {
    const newComic = { ...this.selectedComic, ...form.value };

    // * on edit
    if (this.mode == 'edit') {
      this.onComicEdited.emit(newComic);
    } else if (!this.mode) {
      //* on add
      this.onNewComicAdded.emit(newComic);
    }
    form.reset();
    this.isSearching = false;
    this.isSelected = false;
  }
  // ! on sent
  public onSent(form: NgForm) {
    this.onSubmit(form);
  }
}

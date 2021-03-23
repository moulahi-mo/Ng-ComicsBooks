import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comic } from 'src/app/models/interfaces';

import { FiltersServiceService } from 'src/app/services/filters-service.service';

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
  @Input() id: string;
  @Input() page: 'myComics' | 'details';
  comics: Comic[];
  addOptions: {
    price: number;
    condition: string;
    description: string;
  };
  selectedComic: any;
  isSearching: boolean;

  isSelected: boolean;

  constructor(private filerService: FiltersServiceService) {}

  ngOnInit() {
    // * init fields modal
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

    this.addOptions = {
      price: null,
      condition: 'Good',
      description: null,
    };
    //! check if Comic Is In My Comics Page
    this.checkComicIsInMyComicsPage();
  }

  public checkComicIsInMyComicsPage() {
    //! verify if it is on edit mode ( edit button clicked )
    this.mode == 'edit' ? this.getComicToEdit() : '';
  }

  //! get the comic to edit from card parent
  public getComicToEdit() {
    this.isSearching = false;
    this.isSelected = true;
    this.selectedComic = { ...this.comicDetailsIsHere };
    this.addOptions = {
      price: this.comicDetailsIsHere.price,
      condition: this.comicDetailsIsHere.condition,
      description: this.comicDetailsIsHere.description,
    };
  }

  //! on search
  public onSearch(e: Event) {
    const term: string = (e.target as any).value.trim();

    term ? (this.isSearching = true) : (this.isSearching = false);
    this.filerService.getComicByTitle(term).subscribe((comics: Comic[]) => {
      this.comics = comics;
    });
  }
  //! on search comic from search show card
  public onSelect(comic: Comic) {
    this.isSearching = false;
    this.isSelected = true;
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
      this.isSearching = false;
      this.isSelected = false;
      form.reset();
    }
  }
  // ! on submit button clicked invok submit function
  public onSent(form: NgForm) {
    this.onSubmit(form);
  }

  // ! on closing modal

  public onClose() {
    if (this.mode !== 'edit') {
      this.isSearching = false;
      this.isSelected = false;

      this.addOptions = {
        price: null,
        condition: 'Good',
        description: null,
      };
    }
  }
}

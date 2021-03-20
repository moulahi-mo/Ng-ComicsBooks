import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';
import { FiltersServiceService } from 'src/app/services/filters-service.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Output() onNewComicAdded: EventEmitter<string> = new EventEmitter();
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
  constructor(private filerService: FiltersServiceService) {}

  ngOnInit() {
    this.isSearching = false;
    this.isSelected = false;

    this.addOptions = {
      price: null,
      condition: null,
      description: null,
    };
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
  // ! on add commic
  public onSubmit(form: NgForm) {
    const newComic = { ...this.selectedComic, ...form.value };
    this.onNewComicAdded.emit(newComic);

    form.reset();
  }
}

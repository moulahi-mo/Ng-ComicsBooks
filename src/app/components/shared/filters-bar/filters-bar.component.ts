import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Character, Comic } from 'src/app/models/interfaces';

import { FiltersServiceService } from 'src/app/services/filters-service.service';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent implements OnInit {
  @Output() onSearchComic: EventEmitter<string> = new EventEmitter();
  @Output() onOrderComic: EventEmitter<Comic[]> = new EventEmitter();
  @Output() onQuantityComic: EventEmitter<Comic[]> = new EventEmitter();
  @Output()
  onSingleCharacterSelected: EventEmitter<object> = new EventEmitter();

  @Input() comicsList: Comic[];
  characters: Character[];
  selectedChar: Character | any;
  search: string;
  isError: string = null;
  constructor(private comicFilter: FiltersServiceService) {}

  ngOnInit(): void {
    this.search = null;
  }
  //! serach bar
  public onSearch() {
    this.comicFilter.getComicByTitle(this.search.trim()).subscribe(
      (data: any) => {
        this.onSearchComic.emit(data);
      },
      (err) => (this.isError = err)
    );
  }

  //! characters list clicked
  public onCharacterClicked() {
    this.comicFilter.getCharacters().subscribe(
      (chars: any) => {
        this.characters = chars;
        console.log(this.characters);
      },
      (err) => (this.isError = err)
    );
  }
  //! character selected
  public onCharacterSelected(id: number) {
    //! stock selected char
    this.selectedCharacter(id);
    //! get comics by selected char id
    this.comicFilter.getSingleCharacterComicsList(id).subscribe(
      (comics: Comic[]) => {
        console.log(comics);
        //!emit the result to the parent
        this.onSingleCharacterSelected.emit({
          comics: [...comics],
          character: this.selectedChar[0],
        });
      },
      (err) => (this.isError = err)
    );
  }

  //TODO helpers : Selected character
  public selectedCharacter(id: number) {
    this.selectedChar = this.characters.filter((char) => {
      return char.id == id;
    });
    console.log(this.selectedChar);
  }
  //! order comics
  public onOrderBy(selected: string) {
    console.log(selected);
    //* Alphabetic  or Most recent comics
    if (selected === 'title' || selected === '-onsaleDate') {
      this.comicFilter.orderComicByOption(selected).subscribe(
        (comics: Comic[]) => {
          console.log(comics);
          this.onOrderComic.emit(comics);
        },
        (err) => (this.isError = err)
      );
    } else {
      switch (selected) {
        //* Price Hight to Low
        case 'priceInc':
          this.comicsList = this.comicsList.sort((a, b) => a.price - b.price);
          this.onOrderComic.emit(this.comicsList);
          console.log('priceInc', this.comicsList);
          break;
        // * Price Low to Hight
        case 'priceDesc':
          this.comicsList = this.comicsList.sort((a, b) => b.price - a.price);
          this.onOrderComic.emit(this.comicsList);
          console.log('priceDesc', this.comicsList);
          break;

        default:
          '';
      }
    }
  }

  //! quantity
  public onQuantity(quantity: number) {
    console.log(quantity);
    this.comicFilter.getComicsByQuantity(quantity).subscribe(
      (comics: Comic[]) => {
        console.log(comics);
        this.onQuantityComic.emit(comics);
      },
      (err) => (this.isError = err)
    );
  }
}

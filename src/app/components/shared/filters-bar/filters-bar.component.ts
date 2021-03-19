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
  @Input() comicsList: Comic[];
  characters: Character[] = [];
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

  //! characters
  public onCharacter(quantity: number) {
    console.log(quantity);
    this.comicFilter.getCharacters().subscribe(
      (char: any) => {
        console.log(char);
        this.characters = char;
      },
      (err) => (this.isError = err)
    );
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

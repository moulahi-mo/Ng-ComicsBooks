import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  comics: Comic[] = [];
  comic: Comic;
  isloading: boolean = false;
  isNoData: boolean = false;
  isError: string = null;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.getAllFavorites();
  }

  public getAllFavorites() {
    this.favoritesService.getAllFavorites().subscribe((comics: Comic[]) => {
      // *make sure that the comics dont be doubled in the favorite list ( ... new Set )
      const temporary = comics;
      const filtredFavorites = comics.filter((comic) => {
        for (let item of temporary) {
          return comic.id !== item.id;
        }
      });
      //* sorting by most recent date
      this.comics = filtredFavorites.sort(
        (a, b) =>
          new Date(b.favorite_date).getTime() -
          new Date(a.favorite_date).getTime()
      );
      console.log(this.comics);
    });
  }

  // ! drag drop
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.comics, event.previousIndex, event.currentIndex);
  }
  public onDrag() {}
}

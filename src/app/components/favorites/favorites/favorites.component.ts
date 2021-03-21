import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';
import { FavoritesService } from 'src/app/services/favorites.service';

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
      //* sortin by most recent
      this.comics = comics.sort(
        (a, b) =>
          new Date(b.favorite_date).getTime() -
          new Date(a.favorite_date).getTime()
      );
      console.log(comics);
    });
  }
}

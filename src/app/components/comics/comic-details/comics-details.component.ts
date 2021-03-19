import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from 'src/app/models/interfaces';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss'],
})
export class ComicsDetailsComponent implements OnInit {
  isCreator: boolean;
  comic: Comic;
  constructor(
    private comicsService: ComicsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isCreator = false;
    this.fetchComicDetails(id);
  }
  public fetchComicDetails(id: string) {
    this.comicsService.getSingleComic(id).subscribe((comic: Comic) => {
      // const truncateNames = comic.characters.map((char) => {
      //   const index = char.name.indexOf('(');
      //   if (index > 10) {
      //     return char.name.split('(', 1);
      //   } else {
      //     return char.name;
      //   }
      // });
      // console.log(truncateNames);
      this.comic = comic;
      console.log(this.comic);
    });
  }
}

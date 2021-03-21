import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-comic-more-details',
  templateUrl: './comic-more-details.component.html',
  styleUrls: ['./comic-more-details.component.scss'],
})
export class ComicMoreDetailsComponent implements OnInit {
  @Input() comic: Comic;
  @Input() isCreator: boolean;
  isloading: boolean = false;
  isError: string = null;

  constructor(private myComicService: MyComicsService) {}

  ngOnInit(): void {}

  public onComicEdited(comicEdited: Comic) {
    console.log(comicEdited);
    comicEdited.pages = comicEdited.pages ? comicEdited.pages : 0;
    //! store it to firebase db
    if (comicEdited.id) {
      this.myComicService.addNewComic(comicEdited).subscribe(
        (data: any) => {
          this.comic = comicEdited;
          console.log(data, 'comic edited success successfully');
        },
        (err) => console.log(err)
      );
    }
  }
}

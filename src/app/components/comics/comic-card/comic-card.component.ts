import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
})
export class ComicCardComponent implements OnInit {
  @Input() comic: Comic;
  @Input() isCreator: boolean;
  @Input() page: string;

  uid: string = null;
  constructor(
    private myComicService: MyComicsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    //! check if user is auth
    this.uid = this.auth.getCurrUserUid();
    if (
      this.comic.uid &&
      this.uid === this.comic.uid &&
      this.page != 'favorites'
    ) {
      this.isCreator = true;
    } else {
      this.isCreator = false;
    }
  }

  public onComicEdited(comicEdited: Comic) {
    console.log('from card', comicEdited);

    //! store it to firebase db
    if (comicEdited.id) {
      this.myComicService.editComic(comicEdited).subscribe(
        (data: any) => {
          this.comic = comicEdited;
          console.log(data, 'comic edited success successfully');
        },
        (err) => console.log(err)
      );
    }
  }
}

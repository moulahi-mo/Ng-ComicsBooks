import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
})
export class RemoveModalComponent implements OnInit {
  @Input() id: string;
  @Input() comicId: string;
  constructor(
    private auth: AuthService,
    private myComicService: MyComicsService
  ) {}

  ngOnInit(): void {}

  public onRemove() {
    const uid = this.auth.getCurrUserUid();
    console.log(uid + this.comicId.toString());
    this.myComicService.removeComic(uid + this.comicId.toString()).subscribe(
      () => {
        console.log('comic deleted');
      },
      (err) => console.log(err)
    );
  }
}

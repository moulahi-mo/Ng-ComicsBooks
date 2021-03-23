import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
})
export class RemoveModalComponent implements OnInit {
  @Output() onCloseModalRemove: EventEmitter<boolean> = new EventEmitter();
  @Input() id: string;
  @Input() comicId: string;
  constructor(
    private auth: AuthService,
    private myComicService: MyComicsService
  ) {}

  ngOnInit(): void {}
  // ! on button Yes clicked remove item from db
  public onRemove() {
    const uid = this.auth.getCurrUserUid();
    this.myComicService.removeComic(uid + this.comicId.toString()).subscribe(
      () => {},
      (err) => console.log(err)
    );
  }
  public onClose() {
    this.onCloseModalRemove.emit();
  }
}

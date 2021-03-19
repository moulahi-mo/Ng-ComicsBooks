import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';

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

  constructor() {}

  ngOnInit(): void {}
}

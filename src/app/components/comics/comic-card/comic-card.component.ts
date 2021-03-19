import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
})
export class ComicCardComponent implements OnInit {
  @Input() comic: Comic;
  @Input() isCreator: boolean;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/interfaces';

@Component({
  selector: 'app-character-badge',
  templateUrl: './character-badge.component.html',
  styleUrls: ['./character-badge.component.scss'],
})
export class CharacterBadgeComponent implements OnInit {
  @Input() character: Character;
  isClosed: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}

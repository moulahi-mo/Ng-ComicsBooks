import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/interfaces';

@Component({
  selector: 'app-comic-more-details',
  templateUrl: './comic-more-details.component.html',
  styleUrls: ['./comic-more-details.component.scss'],
})
export class ComicMoreDetailsComponent implements OnInit {
  @Input() comic: Comic;
  isloading: boolean = false;
  isError: string = null;

  constructor() {}

  ngOnInit(): void {
    this.comic = {
      characters: [
        {
          name: 'Blade',
          image:
            'http://i.annihil.us/u/prod/marvel/i/mg/8/a0/523ca6f2b11e4.jpg',
        },
        {
          name: 'Morbius',
          image:
            'http://i.annihil.us/u/prod/marvel/i/mg/b/c0/535fee11e0e1a.jpg',
        },
      ],

      condition: 'good',
      cover:
        'http://i.annihil.us/u/prod/marvel/i/mg/9/60/4bc6b242f18f7/portrait_incredible.jpg',
      date: new Date('2005-01-01T00:00:00-0500'),
      description:
        "A war is raging, and he has a job to do; for Blade the Vampire Hunter, there are no shades of gray! Now, for the first time ever, the House of Ideas reprints the best of Blade in bold black and white from its legendary '70s-era horror magazines - including VAMPIRE TALES and MARVEL PREVIEW! Collecting material from VAMPIRE TALES #8-9, MARVEL PREVIEW #3 and #6, BLADE: CRESCENT CITY BLUES #1, and MARVEL SHADOWS AND LIGHT #1.",
      format: 'Trade Paperback',
      id: '55',
      pages: 0,
      poster: 'http://i.annihil.us/u/prod/marvel/i/mg/7/30/56fd80d89d507.jpg',
      price: 15.99,
      title: 'BLADE: BLACK AND WHITE TPB (Trade Paperback)',
    };
  }
}

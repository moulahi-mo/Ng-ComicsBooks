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
  isloading: boolean;
  isError: string;

  constructor(
    private comicsService: ComicsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isError = null;
    this.isloading = false;
    const id = this.route.snapshot.paramMap.get('id');
    this.isCreator = false;
    // this.comic = {
    //   id: null,
    //   format: null,
    //   pages: null,
    //   title: null,
    //   description: null,
    //   price: null,
    //   date: null,
    //   cover: null,
    //   owner: null,
    //   condition: null,
    //   characters: null,
    //   poster: null,
    // };
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
    // this.fetchComicDetails(id);
  }
  public fetchComicDetails(id: string) {
    this.isError = null;
    this.isloading = true;
    this.comicsService.getSingleComic(id).subscribe(
      (comic: Comic) => {
        // const truncateNames = comic.characters.map((char) => {
        //   const index = char.name.indexOf('(');
        //   if (index > 10) {
        //     return char.name.split('(', 1);
        //   } else {
        //     return char.name;
        //   }
        // });
        // console.log(truncateNames);
        this.isloading = false;
        this.comic = comic;
        console.log(this.comic);
      },
      (err) => {
        this.isloading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }
}

import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/model/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  @Input() film = new Film();
  starsArray: any[] = [];
  genreArray: string[] = [];
  genres: string = '';
  keywords: string = '';
  tooltipText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.starsArray = new Array(this.film.stars);
    this.genreArray = this.film.genres;
    this.genres = this.genreArray.join(', ');
    this.keywords = this.film.keywords.join(', ');

    this.film.stars === 0 ? this.tooltipText = 'Nézhetetlen' : null;
    this.film.stars === 1 ? this.tooltipText = 'Rossz' : null;
    this.film.stars === 2 ? this.tooltipText = 'Gyenge' : null;
    this.film.stars === 3 ? this.tooltipText = 'Átlagos' : null;
    this.film.stars === 4 ? this.tooltipText = 'Jó' : null;
    this.film.stars === 5 ? this.tooltipText = 'Zseniális' : null;
  }
}

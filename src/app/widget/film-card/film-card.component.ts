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

  constructor() { }

  ngOnInit(): void {
    this.starsArray = new Array(this.film.stars);
    this.genreArray = this.film.genres;
    this.genres = this.genreArray.join(", ");
  }

}

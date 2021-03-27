import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from 'src/app/model/film';
import { FilmService } from 'src/app/service/film.service';
import { PaginatorService } from 'src/app/service/paginator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list$: BehaviorSubject<Film[]> = this.filmService.list$;
 
  filterInfo: {
    filmTitle: string;
    filmYearFrom: number;
    filmYearTo: number;
    stars: number;
    filmGenre: string;
  } = {
    filmTitle: '',
    filmYearFrom: 0,
    filmYearTo: 0,
    stars: -1,
    filmGenre : ''
  };

  constructor(
    private filmService: FilmService,
    public paginator: PaginatorService
  ) { }

  ngOnInit(): void {
    this.filmService.getAll();
  }

  onClickFilter(): void {
    const filmTitle = (document.querySelector('#film-title') as HTMLInputElement).value;
    const filmYearFrom = Number((document.querySelector('#film-year-from') as HTMLInputElement).value);
    const filmYearTo = Number((document.querySelector('#film-year-to') as HTMLInputElement).value);
    const stars = Number((document.querySelector('#stars') as HTMLInputElement).value);
    const filmGenre = (document.querySelector('#film-genre') as HTMLInputElement).value;
    this.filterInfo.filmTitle = filmTitle;
    this.filterInfo.filmYearFrom = filmYearFrom;
    this.filterInfo.filmYearTo = filmYearTo;
    this.filterInfo.stars = stars;
    this.filterInfo.filmGenre = filmGenre;
  }
 
}

import { AfterViewChecked, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from 'src/app/model/film';
import { FilmService } from 'src/app/service/film.service';
import { PaginatorService } from 'src/app/service/paginator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  list$: BehaviorSubject<Film[]> = this.filmService.list$;

  filterInfo: {
    filmTitle: string;
    filmYearFrom: number;
    filmYearTo: number;
    stars: number;
    filmGenres: string[];
    keywords: string[];
  } = {
      filmTitle: '',
      filmYearFrom: 0,
      filmYearTo: 0,
      stars: -1,
      filmGenres: [],
      keywords: []
    };

  constructor(
    private filmService: FilmService,
    public paginator: PaginatorService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.filmService.getAll();
    document.addEventListener('keydown', e => e.key === 'Escape' ?
      document.querySelector('#search-section')?.classList.remove('show') : null);
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  onClickFilter(): void {
    const filmTitle = (document.querySelector('#film-title') as HTMLInputElement).value.trim();
    const filmYearFrom = Number((document.querySelector('#film-year-from') as HTMLInputElement).value.trim());
    const filmYearTo = Number((document.querySelector('#film-year-to') as HTMLInputElement).value.trim());
    const stars = Number((document.querySelector('#stars') as HTMLInputElement).value);
    const filmGenres = (document.querySelector('#film-genres') as HTMLInputElement).value.trim().split(',');
    const filmKeywords = (document.querySelector('#film-keywords') as HTMLInputElement).value.trim().split(',');
    this.filterInfo.filmTitle = filmTitle;
    this.filterInfo.filmYearFrom = filmYearFrom;
    this.filterInfo.filmYearTo = filmYearTo;
    this.filterInfo.stars = stars;
    this.filterInfo.filmGenres = filmGenres;
    this.filterInfo.keywords = filmKeywords;
  }
}

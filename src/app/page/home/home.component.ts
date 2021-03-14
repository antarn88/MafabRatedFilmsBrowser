import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from 'src/app/model/film';
import { PaginationInfo } from 'src/app/model/pagination-info';
import { FilmService } from 'src/app/service/film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list$: BehaviorSubject<Film[]> = this.filmService.list$;
  filmList: Film[] = [];
  paginationInfo: PaginationInfo = new PaginationInfo(10);
  phrase: string = '';
  
  constructor(
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.filmService.getAll();
    this.list$.subscribe(
      list => {
        this.filmList = list;
        this.paginationInfo.listLength = list.length;
      }
    );
  }

  setHitsInterval(intervals: any): void {
    this.paginationInfo.startHits = intervals.startHits;
    this.paginationInfo.endHits = intervals.endHits;
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}

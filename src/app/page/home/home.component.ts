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
  phrase: string = '';

  constructor(
    private filmService: FilmService,
    public paginator: PaginatorService
  ) { }

  ngOnInit(): void {
    this.filmService.getAll();
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}

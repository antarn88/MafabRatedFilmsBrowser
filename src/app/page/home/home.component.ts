import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from 'src/app/model/film';
import { ConfigService } from 'src/app/service/config.service';
import { FilmService } from 'src/app/service/film.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filmList: BehaviorSubject<Film[]> = this.filmService.list$;
  startHits = this.configService.startHits;
  endHits = this.configService.endHits;
  
  constructor(
    private filmService: FilmService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.filmService.getAll();
  }

  setStartHits(startHits: number): void {
    this.startHits = startHits;
  }

  setEndHits(endHits: number): void {
    this.endHits = endHits;
  }
 

}

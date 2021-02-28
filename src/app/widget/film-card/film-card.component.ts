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

  constructor() { }

  ngOnInit(): void {
  }

}

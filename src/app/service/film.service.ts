import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Film } from '../model/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  
  serverUrl: string = 'http://localhost:3000/films';
  list$: BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Film[]>(this.serverUrl).subscribe(films => this.list$.next(films));
  }
  
}

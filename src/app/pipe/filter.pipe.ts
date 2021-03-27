import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../model/film';
import { PaginatorService } from '../service/paginator.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(private paginator: PaginatorService) { }

  transform(value: any[] | null, filmTitle: string, filmYearFrom: number, filmYearTo: number, stars: number, filmGenre: string): Film[] | null {

    !Array.isArray(value) ? value : null;

    let filmTitleMatch = true;
    let filmYearFromMatch = true;
    let filmYearToMatch = true;
    let starsMatch = true;
    let filmGenreMatch = true;

    if (value) {
      const filtered = value.filter(item => {
        filmTitleMatch = filmTitle ? item.name.toLowerCase().includes(filmTitle.toLowerCase()) : filmTitleMatch;
        filmYearFromMatch = filmYearFrom ? item.year >= filmYearFrom : filmYearFromMatch;
        filmYearToMatch = filmYearTo ? item.year <= filmYearTo : filmYearToMatch;
        starsMatch = item.stars === stars || stars === -1;
        filmGenreMatch = filmGenre ? item.genres.map((genre: string) => genre.toLowerCase()).includes(filmGenre.toLowerCase()) : filmGenreMatch;
        return filmTitleMatch && filmYearFromMatch && filmYearToMatch && starsMatch && filmGenreMatch;
      });
      this.paginator.listLength = filtered.length;
      this.paginator.methodForFilter();
      return filtered;
    }
    return null;
  }

}

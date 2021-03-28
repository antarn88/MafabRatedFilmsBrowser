import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../model/film';
import { PaginatorService } from '../service/paginator.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(private paginator: PaginatorService) { }

  transform(value: any[] | null, filmTitle: string, filmYearFrom: number, filmYearTo: number, stars: number, filmGenres: string[], filmKeywords: string[]): Film[] | null {

    !Array.isArray(value) ? value : null;

    filmGenres = filmGenres.filter(genre => genre);
    filmKeywords = filmKeywords.filter(keyword => keyword);
    let filmTitleMatch = true;
    let filmYearFromMatch = true;
    let filmYearToMatch = true;
    let starsMatch = true;
    let filmGenresMatch = true;
    let filmKeywordsMatch = true;

    if (value) {
      const filtered = value.filter(item => {
        filmTitleMatch = filmTitle ? item.name.toLowerCase().includes(filmTitle.toLowerCase()) : filmTitleMatch;
        filmYearFromMatch = filmYearFrom ? item.year >= filmYearFrom : filmYearFromMatch;
        filmYearToMatch = filmYearTo ? item.year <= filmYearTo : filmYearToMatch;
        starsMatch = item.stars === stars || stars === -1 || (stars === 45 && item.stars === 4) || (stars === 45 && item.stars === 5);

        if (filmGenres) {
          const itemGenres = item.genres.map((genre: string) => genre.toLowerCase());
          const expectedGenres = filmGenres.map(genre => genre.toLowerCase().trim());
          filmGenresMatch = expectedGenres.every(genre => itemGenres.indexOf(genre) >= 0); // WITH 'AND' CONNECTION
        }

        if (filmKeywords.length) {
          const itemKeywords = item.keywords.map((keyword: string) => keyword.toLowerCase());
          const expectedKeywords = filmKeywords.map(keyword => keyword.toLowerCase().trim());
          filmKeywordsMatch = expectedKeywords.some(keyword => itemKeywords.indexOf(keyword) >= 0); // WITH 'OR' CONNECTION
        }

        return filmTitleMatch && filmYearFromMatch && filmYearToMatch && starsMatch && filmGenresMatch && filmKeywordsMatch;
      });
      this.paginator.listLength = filtered.length;
      this.paginator.methodForFilter();

      return filtered;
    }
    return null;
  }

}

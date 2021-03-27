import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../model/film';
import { PaginatorService } from '../service/paginator.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(private paginator: PaginatorService) { }

  transform(value: any[] | null,
    filmTitle: string,
    filmYearFrom: number,
    filmYearTo: number,
    stars: number,
    filmGenre: string
  ): Film[] | null {

    !Array.isArray(value) ? value : null;

    if (value) {
      const filtered = value.filter(item => {
        return item.stars === stars || stars === -1;
      });

      this.paginator.listLength = filtered.length;
      this.paginator.methodForFilter();

      return filtered;
    }
    return null;
  }

}

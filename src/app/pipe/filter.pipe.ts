import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../model/film';
import { PaginatorService } from '../service/paginator.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(private paginator: PaginatorService) { }

  transform(value: any[] | null, phrase: string): Film[] | null {

    !Array.isArray(value) || !phrase ? value : null;

    if (value) {
      const filtered = value.filter(item => item.name.toLowerCase().includes(phrase.toLowerCase()));
      this.paginator.listLength = filtered.length;
      this.paginator.methodForFilter();
      return filtered;
    }

    return null;
  }

}

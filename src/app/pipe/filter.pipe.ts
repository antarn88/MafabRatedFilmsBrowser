import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../model/film';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, phrase: string): Film[] | null {
    !Array.isArray(value) || !phrase ? value : null;
    if (value) {
      const filtered = value.filter(item => item.name.toLowerCase().includes(phrase.toLowerCase()));
      return filtered;
    }
    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../model/film';
import { PaginatorService } from '../service/paginator.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(
    private paginator: PaginatorService,
  ) { }
  
  transform(value: any[] | null, phrase: string): Film[] | null {
    
    !Array.isArray(value) || !phrase ? value : null;
    if (value) {
      const filtered = value.filter(item => item.name.toLowerCase().includes(phrase.toLowerCase()));
      this.paginator.listLength = filtered.length;
      
      this.paginator.startHits = 0;
      this.paginator.endHits = 10;
      this.paginator.setNthPageActive(1);
      this.paginator.pages = [];
      this.paginator.setLastPageAbsolute();
      this.paginator.setPageArray();

      // if (this.paginator.firstPage === this.paginator.lastPage) {
      //   const previousButton = document.querySelector(".page-item.previous");
      //   const nextButton = document.querySelector(".page-item.next");
      //   previousButton?.classList.add('disabled');
      //   nextButton?.classList.add('disabled');
      // }

      return filtered;
    }
    return null;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationInfo: any = {};
  @Output() hitsInterval: EventEmitter<{}> = new EventEmitter();

  pages: number[] = [];
  firstPage: number = 1;
  lastPage: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.setPageArray();
    this.setInitialStatus();
  }

  setPageArray(): void {
    this.lastPage = Math.ceil(this.paginationInfo.listLength / this.paginationInfo.hitsPerPage);
    for (let i = 1; i <= this.lastPage; i++) {
      this.pages.push(i);
    }
  }

  setInitialStatus(): void {
    if (this.firstPage === this.lastPage) {
      const previousLiItem = document.querySelector('.previous');
      const nextLiItem = document.querySelector('.next');
      previousLiItem?.classList.add('disabled');
      nextLiItem?.classList.add('disabled');
    }
  }

  onClickListItem(page: number): void {
    let startHits;
    let endHits;

    if (page === 1) {
      startHits = 0;
      endHits = startHits + this.paginationInfo.hitsPerPage;
    } else {
      startHits = (page - 1) * this.paginationInfo.hitsPerPage;
      endHits = startHits + this.paginationInfo.hitsPerPage;
    }

    this.hitsInterval.emit({ startHits: startHits, endHits: endHits });

    const allPages = Array.from(document.querySelectorAll('li.page'));
    allPages.map(pageLiItem => {
      const aTextContent = pageLiItem.querySelector('a')?.textContent;
      pageLiItem.classList.remove('active');
      String(page) === aTextContent ? pageLiItem.classList.add('active') : null;
    });

    const previousLiItem = document.querySelector('.previous');
    const nextLiItem = document.querySelector('.next');

    page === this.firstPage ? previousLiItem?.classList.add('disabled') : previousLiItem?.classList.remove('disabled');
    page === this.lastPage ? nextLiItem?.classList.add('disabled') : nextLiItem?.classList.remove('disabled');
  }

  goPreviousPage(): void {
    const currentPage = Number(document.querySelector('li.page.active a')?.textContent);
    currentPage !== this.firstPage ? this.onClickListItem(currentPage - 1) : null;
  }

  goNextPage(): void {
    const currentPage = Number(document.querySelector('li.page.active a')?.textContent);
    currentPage !== this.lastPage ? this.onClickListItem(currentPage + 1) : null;
  }

}

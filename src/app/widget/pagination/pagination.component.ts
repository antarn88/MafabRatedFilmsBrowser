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
  currentPage: number = 1;
  lastPage: number = 1;
  pageStart: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.setLastPageAbsolute();
    this.setPageArray();
  }

  setNthPageActive(page: number): void {
    const allPages = Array.from(document.querySelectorAll('li.page'));
    allPages.map(pageLiItem => {
      const aTextContent = pageLiItem.querySelector('a')?.textContent;
      pageLiItem.classList.remove('active');
      String(page) === aTextContent ? pageLiItem.classList.add('active') : null;
    });
  }

  setLastPageAbsolute(): void {
    this.lastPage = Math.ceil(this.paginationInfo.listLength / this.paginationInfo.hitsPerPage);
  }

  setPageArray(): void {
    const initialPageCount = this.lastPage < 10 ? this.lastPage : 10;
    for (let i = 1; i <= initialPageCount; i++) {
      this.pages.push(i);
    }
  }

  removeActiveClassFromFirstPage(): void {
    if (this.pages.find(page => page === 1) && this.currentPage !== 1) {
      setTimeout(() => {
        this.setNthPageActive(this.currentPage);
      }, 50);
    }
  }

  renderPaginator(): void {
    this.pages = [];
    this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
    for (let i = this.pageStart; i < this.pageStart + 10 && i <= this.lastPage; i++) {
      this.pages.push(i);
    }
  }

  onClickListItem(page: number): void {
    this.currentPage = page;
    this.renderPaginator();
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

    const previousLiItem = document.querySelector('.previous');
    const nextLiItem = document.querySelector('.next');

    page === this.firstPage ? previousLiItem?.classList.add('disabled') : previousLiItem?.classList.remove('disabled');
    page === this.lastPage ? nextLiItem?.classList.add('disabled') : nextLiItem?.classList.remove('disabled');

    this.removeActiveClassFromFirstPage();
    this.setNthPageActive(page);
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

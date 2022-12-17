import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  /* SET HITS PER PAGE */
  hitsPerPage = 5;
  /* ============= */

  listLength = 0;
  startHits = 0;
  endHits = 0;
  firstPage = 1;
  lastPage = 1;
  initialPageCount = 0;
  currentPage = 0;
  pageStart = 0;
  pages: number[] = [];

  constructor() {
    this.endHits = this.startHits + this.hitsPerPage;
  }

  setLastPageAbsolute(): void {
    this.lastPage = Math.ceil(this.listLength / this.hitsPerPage);
  }

  setPageArray(): void {
    const initialPageCount = this.lastPage < 10 ? this.lastPage : 10;
    for (let i = 1; i <= initialPageCount; i++) {
      this.pages.push(i);
    }
  }

  setNthPageActive(page: number): void {
    const allPages = Array.from(document.querySelectorAll('li.page'));
    allPages.map(pageLiItem => {
      const aTextContent = pageLiItem.querySelector('a')?.textContent;
      pageLiItem.classList.remove('active');
      String(page) === aTextContent ? pageLiItem.classList.add('active') : null;
    });
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
      endHits = startHits + this.hitsPerPage;
    } else {
      startHits = (page - 1) * this.hitsPerPage;
      endHits = startHits + this.hitsPerPage;
    }

    this.startHits = startHits;
    this.endHits = endHits;

    const previousLiItem = document.querySelector('.previous');
    const nextLiItem = document.querySelector('.next');

    page === this.firstPage ? previousLiItem?.classList.add('disabled') : previousLiItem?.classList.remove('disabled');
    page === this.lastPage ? nextLiItem?.classList.add('disabled') : nextLiItem?.classList.remove('disabled');

    this.removeActiveClassFromFirstPage();
    this.setNthPageActive(page);
  }

  goPreviousPage(event: Event): void {
    if (!(event.target as HTMLElement).classList.contains('disabled')) {
      const currentPage = Number(document.querySelector('li.page.active a')?.textContent);
      currentPage !== this.firstPage ? this.onClickListItem(currentPage - 1) : null;
    }
  }

  goNextPage(event: Event): void {
    if (!(event.target as HTMLElement).classList.contains('disabled')) {
      const currentPage = Number(document.querySelector('li.page.active a')?.textContent);
      currentPage !== this.lastPage ? this.onClickListItem(currentPage + 1) : null;
    }
  }

  setPreviousAndNextButtonState(): void {
    const previousButton = document.querySelector(".page-item.previous");
    const nextButton = document.querySelector(".page-item.next");

    if (this.firstPage === this.lastPage) {
      previousButton?.classList.add('disabled');
      nextButton?.classList.add('disabled');
    }
    else {
      previousButton?.classList.remove('disabled');
      nextButton?.classList.remove('disabled');
    }
    if (this.firstPage === 1 || this.lastPage === 0) {
      previousButton?.classList.add('disabled');
    }
    if (this.lastPage === 0 || this.lastPage === 1) {
      nextButton?.classList.add('disabled');
    }
  }

  methodForFilter(): void {
    this.pages = [];
    this.startHits = 0;
    this.endHits = this.hitsPerPage;
    this.setNthPageActive(1);
    this.setLastPageAbsolute();
    this.setPageArray();
    this.setPreviousAndNextButtonState();
  }
}
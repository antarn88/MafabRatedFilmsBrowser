export class PaginationInfo {
  listLength: number = 0;
  hitsPerPage: number = 0;
  startHits: number = 0;
  endHits: number = 0;

  constructor(hitsPerPage: number) {
    this.hitsPerPage = hitsPerPage;
    this.endHits = this.startHits + this.hitsPerPage;
  }
}

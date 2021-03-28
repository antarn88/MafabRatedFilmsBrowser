import { Component, OnInit } from '@angular/core';
import { PaginatorService } from 'src/app/service/paginator.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  constructor(public paginator: PaginatorService) { }

  ngOnInit(): void {
    document.addEventListener('keydown', (e) => {
      e.key === 'ArrowLeft' ? (document.querySelector('.previous') as HTMLElement).click() : null;
      e.key === 'ArrowRight' ? (document.querySelector('.next') as HTMLElement).click() : null;
    });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorService } from 'src/app/service/paginator.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() hitsPerPage: number = 0;
  @Output() hitsInterval: EventEmitter<{}> = new EventEmitter();
  
  constructor(
    public paginator: PaginatorService
  ) { }

  ngOnInit(): void {
  }
  
}

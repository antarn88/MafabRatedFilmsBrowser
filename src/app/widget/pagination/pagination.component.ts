import { Component } from '@angular/core';
import { PaginatorService } from 'src/app/service/paginator.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor(public paginator: PaginatorService) { }
}

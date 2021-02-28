import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() hitsLength: number | undefined;
  @Output() startHits: EventEmitter<number> = new EventEmitter<number>();
  @Output() endHits: EventEmitter<number> = new EventEmitter<number>();
  pagesArray: number[] = [];
  pagesNum: number = 0;
  hitsPerPage = this.configService.hitsPerPage;
  
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    if (this.hitsLength) {
      this.pagesNum = Math.floor(this.hitsLength / this.hitsPerPage);
    }
    this.setNumberArray();
  }

  setNumberArray(): void {
    for (let i = 1; i <= this.pagesNum; i++) {
      this.pagesArray.push(i);
    }
  }
  

}

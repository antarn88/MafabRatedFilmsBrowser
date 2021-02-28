import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // For pagination
  startHits: number = 0;
  endHits: number = 20;
  hitsPerPage: number = 5;

  constructor() { }
}

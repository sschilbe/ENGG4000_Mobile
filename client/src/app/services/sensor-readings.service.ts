import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorReadingsService {
  private dataSource = new BehaviorSubject<any>([]);
  data = this.dataSource.asObservable();

  constructor() {}

  updateData( data : Uint16Array ) {
    this.dataSource.next( Array.from( data ) );
  }
}

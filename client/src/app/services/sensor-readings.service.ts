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
    // TODO - convert the force data into Newtons from the raw values

    // TODO - convert the acceleration data into g's from the raw values

    // TODO - convert the rotation data into degrees/s from the raw values
    this.dataSource.next( Array.from( data ) );
  }
}

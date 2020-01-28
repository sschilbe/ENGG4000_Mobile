import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorReadingsService {
  private forceDataSource = new BehaviorSubject<any>([]);
  forceData = this.forceDataSource.asObservable();

  private imuDataSource = new BehaviorSubject<any>([]);
  imuData = this.imuDataSource.asObservable();

  constructor() {}

  updateForceData( data : Uint16Array ) {
    this.forceDataSource.next( Array.from( data ) );
  }

  updateIMUData( data : Uint16Array ) {
    this.imuDataSource.next( Array.from( data ) );
  }
}

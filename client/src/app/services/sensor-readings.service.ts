import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIService, SensorType } from '../services/api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SensorReadingsService {
  private forceDataSource = new BehaviorSubject<any>([]);
  forceData = this.forceDataSource.asObservable();

  private accelDataSource = new BehaviorSubject<any>([]);
  accelData = this.accelDataSource.asObservable();

  private gyroDataSource = new BehaviorSubject<any>([]);
  gyroData = this.gyroDataSource.asObservable();

  private forceSensors;
  private accelSensors;
  private gyroSensors;
  constructor(private apiService : APIService) {
    /* Retrieve all of the sensors stored remotely */
    this.apiService.ListSensors( undefined, 15 ).then( query => {
      var sensors = query.items; 
      this.forceSensors = (sensors.filter( sensor => sensor.type === SensorType.force )).sort((a,b) => a.name.localeCompare( b.name ) );
      this.accelSensors = (sensors.filter( sensor => sensor.type === SensorType.accel )).sort((a,b) => a.name.localeCompare( b.name ) );
      this.gyroSensors  = (sensors.filter( sensor => sensor.type === SensorType.gyro )).sort((a,b) => a.name.localeCompare( b.name ) );
    });
    
  }

  updateForceData( data : Uint16Array ) {
    this.forceDataSource.next( data );
    /* Upload data to the cloud */

    // Uncomment Below to upload data to cloud DB
    /*for( let i in this.forceSensors ) {
      this.apiService.CreateData({
        value: data[i],
        time: moment().format(),
        dataSensorId: this.forceSensors[i].id
      });
    }*.
  }

  updateAccelData( data : Uint8Array ) {
    this.accelDataSource.next( data );
    /* Upload data to the cloud */
    for( let i in this.accelSensors ) {
      this.apiService.CreateData({
        value: data[i],
        time: moment().format(),
        dataSensorId: this.accelSensors[i].id
      });
    }
  }

  updateGyroData( data: Uint8Array ) {
    this.gyroDataSource.next( data );
    /* Upload data to the cloud */
    for( let i in this.gyroSensors ) {
      this.apiService.CreateData({
        value: data[i],
        time: moment().format(),
        dataSensorId: this.gyroSensors[i].id
      });
    }
  }
}

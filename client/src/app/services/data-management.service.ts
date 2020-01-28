import { Injectable } from '@angular/core';
import { APIService, CreateDataInput } from './api.service';
import { Session } from '../classes/item.class';
import * as moment from 'moment';
import { SensorReadingsService } from './sensor-readings.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  currentSession: Session = null;
  sessionData: Array<CreateDataInput> = new Array();

  forceData: Array<number> = null;
  imuData: Array<number> = null;

  forceSubscription;
  imuSubscription;

  constructor(private apiService: APIService,
              private sensorReadings: SensorReadingsService) { 
  }

  startNewSession() {
    // Guard against case where there is a session in progress when this is called
    if( this.currentSession != null ) {
      this.endSession();
    }

    // Create a session in the DB
    this.apiService.CreateSession({ 
      name: moment().toISOString()
    }).then( (session) => {
      this.currentSession = new Session( session );
      // Subscribe to the notifications from the BLE module
      this.forceSubscription = this.sensorReadings.forceData.subscribe( (data) => {
        this.forceData = data;

        if( this.imuData != null ) {
          // Add this data to the current data for the session
          var tempData = this.forceData.concat( this.imuData );
          this.sessionData.push({
            values: tempData,
            time: moment().toISOString(),
            dataSessionId: this.currentSession.id
          })

          this.imuData = null;
          this.forceData = null;
        }
      });

      this.imuSubscription = this.sensorReadings.imuData.subscribe( (data) => {
        this.imuData = data;

        if( this.forceData != null ) {
          // Add this data to the current data for the session
          var tempData = this.forceData.concat( this.imuData );
          this.sessionData.push({
            values: tempData,
            time: moment().toISOString(),
            dataSessionId: this.currentSession.id
          })

          this.imuData = null;
          this.forceData = null;
        }
      });
      
      console.log( this.currentSession );
    },
    (reason) => console.error( reason ) );
  }


  endSession() {
    // Guard against current session not being set
    if( this.currentSession == null ) {
      return;
    }

    this.forceSubscription.unsubscribe();
    this.imuSubscription.unsubscribe();

    console.log( this.sessionData );
    /*this.apiService.BatchAddData( this.sessionData ).then( data => {
      console.log( data );
    });*/

    this.sessionData = new Array();
    this.currentSession = null
  }
}

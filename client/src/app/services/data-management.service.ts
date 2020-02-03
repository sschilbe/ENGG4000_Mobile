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

  data: Array<number> = null;
  dataSubscription;

  // Debugging information
  start: Date = null ;
  end: Date = null;
  numberOfNotifications = 0;

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
      this.start = new Date(); // Debug
      this.dataSubscription = this.sensorReadings.data.subscribe( (data) => {
        
        this.numberOfNotifications++; // Debug

        this.sessionData.push({
          values: data,
          time: moment().toISOString(),
          dataSessionId: this.currentSession.id
        });

        this.data = null;
      });

      console.log( this.currentSession );
    },
    (reason) => console.error( reason ) );
  }


  endSession() {
    this.end = new Date(); // Debug
    console.log( "Notifications per second: " + ( this.numberOfNotifications / ( (this.end.valueOf() - this.start.valueOf() ) / 1000 ) ) );

    // Guard against current session not being set
    if( this.currentSession == null ) {
      return;
    }

    this.dataSubscription.unsubscribe();

    console.log( this.sessionData );
    /*this.apiService.BatchAddData( this.sessionData ).then( data => {
      console.log( data );
    });*/

    this.sessionData = new Array();
    this.currentSession = null
  }
}

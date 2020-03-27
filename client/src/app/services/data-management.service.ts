import { Injectable } from '@angular/core';
import { APIService, CreateDataInput } from './api.service';
import { Session } from '../classes/item.class';
import * as moment from 'moment';
import { SensorReadingsService } from './sensor-readings.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  currentSession: Session = null;
  sessionData: Array<CreateDataInput> = new Array();

  dataSubscription;

  constructor(private apiService: APIService,
              private sensorReadings: SensorReadingsService,
              private db: DatabaseService) {
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
      this.dataSubscription = this.sensorReadings.data.subscribe( (data) => {
        if( data.length > 0 ) {
          this.sessionData.push({
            values: data,
            time: moment().toISOString(),
            sessionId: this.currentSession.id
          });
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

    this.dataSubscription.unsubscribe();
    this.db.uploadSessionData( this.currentSession.id, this.sessionData );

    this.sessionData = new Array();
    this.currentSession = null
  }
}

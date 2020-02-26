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

  dataSubscription;

  constructor(private apiService: APIService,
              private sensorReadings: SensorReadingsService) { 
  }

  startNewSession() {
    // Guard against case where there is a session in progress when this is called
    if( this.currentSession != null ) {
      this.endSession( "" );
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


  endSession( title: string) {
    // Guard against current session not being set
    if( this.currentSession == null ) {
      return;
    }

    this.dataSubscription.unsubscribe();

    // Update the session name if given a title
    if( title != "" ) {
      this.apiService.UpdateSession({
        id: this.currentSession.id,
        name: title
      }).then( () => {
        console.log( "Session title updated successfully" );
      }, () => {
        console.log( "Error updating session title" );
      });
    }

    // Chunk up the data into 25 reading blocks to conform to the limit listed here: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
    var i,length,chunk = 25;
    length=this.sessionData.length;
    for(i=0; i < length; i+=chunk) {
      // Uncomment to upload data to the cloud server
      /*this.apiService.BatchAddData( this.sessionData.slice(i, i+chunk) ).then( data => {
        console.log( data );
      });*/
    }
    
    this.sessionData = new Array();
    this.currentSession = null
  }
}

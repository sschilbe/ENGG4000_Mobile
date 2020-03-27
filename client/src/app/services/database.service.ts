import { Injectable } from '@angular/core';
import { CreateDataInput, APIService } from './api.service';
import { Session } from '../classes/item.class';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  sessions : Array<Session>;

  constructor(private apiService: APIService) {
    // Retrieve all of the current sessions from the DB
    // If there are more than 1000 sessions in the DB this will need to be modifiied
    this.apiService.ListSessions( undefined, 1000 ).then( query => {
      this.sessions = query.items.map( item => <Session>{ name: item.name, id: item.id } );
    });

    // Subscribe to any new sessions that are created so that they can be added to the list of sessions
    this.apiService.OnCreateSessionListener.subscribe( newSession => {
      this.sessions.push( new Session({
        name: newSession.name,
        id: newSession.id
      }));
    });
  }

  uploadSessionData( id: String, data: Array<CreateDataInput> ) {
    // Chunk up the data into 25 reading blocks to conform to the limit listed here: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
    var i,length,chunk = 25;
    length = data.length;
    for(i = 0; i < length; i += chunk) {
      // Uncomment to upload data to the cloud server
      this.apiService.BatchAddData( data.slice(i, i+chunk) ).then( data => {
        console.log( data );
      });
    }
  }

  renameSession( id: string, name: string ): boolean {
    if( name != "" && this.sessions.every( session => session.name != name ) ) {
      this.apiService.UpdateSession({
        id: id,
        name: name
      }).then( () => {
        console.log( "Session title updated successfully" );
      }, () => {
        console.log( "Error updating session title" );
      });

      return true;
    } else {
      return false;
    }
  }


}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChartService, Chart } from '../services/chart.service';
import { ImuVisualizationService, Visualization } from '../services/imu-visualization.service';

import { Session } from '../classes/item.class';
import { APIService } from '../services/api.service';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  segment: String;

  // Force Chart Data
  chart: Chart = {
    chartName: 'forceChartSaved',
    chartInterval: null,
    chartRef: null,
    data: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0],
                [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
                [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0],
                [3, 0, 0], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0],
                [4, 0, 0], [4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 0], [4, 6, 0], [4, 7, 0],
                [5, 0, 0], [5, 1, 0], [5, 2, 0], [5, 3, 0], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0],
                [6, 0, 0], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0],
                [7, 0, 0], [7, 1, 0], [7, 2, 0], [7, 3, 0], [7, 4, 0], [7, 5, 0], [7, 6, 0], [7, 7, 0],
                [8, 0, 0], [8, 1, 0], [8, 2, 0], [8, 3, 0], [8, 4, 0], [8, 5, 0], [8, 6, 0], [8, 7, 0],
                [9, 0, 0], [9, 1, 0], [9, 2, 0], [9, 3, 0], [9, 4, 0], [9, 5, 0], [9, 6, 0], [9, 7, 0]]
  }

  // IMU Visualization
  @ViewChild("imuVisualizationSaved", { static: true } ) imuVisualizationRef: ElementRef;
  imuVisualization: Visualization = new Visualization();

  interval;

  sessions : Array<Session>;
  selectedSession : Session;
  nextToken = null;

  selectOptions = {
    header: "Select Session"
  };

  // Select
  @ViewChild("select", { static: true } ) select: IonSelect;
  constructor(private chartService: ChartService,
              private imuVisualizer: ImuVisualizationService,
              private apiService: APIService) {
    this.segment = "force";
    this.imuVisualization.initialized = false;

    // Retrieve all of the current sessions from the DB
    this.apiService.ListSessions( undefined, 50 ).then( query => {
      this.sessions = query.items.map( item => <Session>{ name: item.name, id: item.id } );
    });

    // Subscribe to any new sessions that are created so that they can be added to the list of sessions
    this.apiService.OnCreateSessionListener.subscribe( newSession => {
      console.log( newSession );
      this.sessions.push( new Session({
        name: newSession.name,
        id: newSession.id
      }));
    });
  }

  sessionChanged( event ) {
    // Set the new session
    this.selectedSession = event.detail.value; // Assign value 

    // Check if there is data for this session, if not retrieve it from the DB
    if( this.selectedSession.data == null ) {
      this.apiService.DataBySession( this.selectedSession.id, undefined, undefined, undefined, 1000 ).then( query => {
        this.selectedSession.data = query.items;
        this.nextToken = query.nextToken;

        // Change the data on the chart
        this.chart.data = [];
        for( var i = 0; i < this.selectedSession.data.length; i++) {
          var data = this.selectedSession.data[i].values.slice(0, 8);
          for( var j = 0; j < 8; j++ ) {
            // With large amounts of data highcharts only accepts arrays as inputs
            // therefore the below data is in the format [x,y,value]
            this.chart.data.push( [i*14,j,data[j]] ); // Give each column 14 milliseconds to get roughly 70Hz
          }
        }

        this.chart.chartRef.xAxis[0].setExtremes(0, Math.min( this.chart.data.length/8 * 14, 1000*14 ) );
        this.chart.chartRef.series[0].setData( this.chart.data, true, false, false );
      });
    }

    
  }
  
  ngOnInit() {
    this.imuVisualizer.setCanvasElement( this.imuVisualization, this.imuVisualizationRef );
  }

  onSegmentChanged() {
    if( "force" == this.segment ) {
      this.chartService.chart( this.chart );

      //  De-init IMU visualization
      this.imuVisualizer.stopAnimation( this.imuVisualization );
    } else {
      //  De-init Chart
      clearInterval( this.chart.chartInterval );

      if( !this.imuVisualization.initialized ) {
        this.imuVisualizer.initialiseWebGLObjectAndEnvironment( this.imuVisualization );
      }

      this.imuVisualizer.renderAnimation( this.imuVisualization );
    }
  }

  ionViewWillEnter() {
    this.apiService.ListSessions().then( sessions => {
      this.sessions = sessions.items.map( item => <Session>{id: item.id, name: item.name });
    });

    if( "imu" == this.segment ) {
      this.imuVisualizer.renderAnimation( this.imuVisualization );
    } else {
      this.chartService.chart( this.chart );
    }
  }

  ionViewDidEnter() {
    this.select.open();
  }

  ionViewDidLeave() {
    clearInterval( this.chart.chartInterval );
    this.imuVisualizer.stopAnimation( this.imuVisualization );  
  }
}

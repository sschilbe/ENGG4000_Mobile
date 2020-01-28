import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChartService, Chart } from '../services/chart.service';
import { ImuVisualizationService, Visualization } from '../services/imu-visualization.service';
import {IonRangeSliderComponent} from "ng2-ion-range-slider";

import * as moment from 'moment';
import { Session } from '../classes/item.class';
import { APIService } from '../services/api.service';

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
    forceData: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0]]
  }

  // IMU Visualization
  @ViewChild("imuVisualizationSaved", { static: true } ) imuVisualizationRef: ElementRef;
  imuVisualization: Visualization = new Visualization();

  // Management for current time
  start: moment.Moment = moment();
  end: moment.Moment = moment();

  // Progress through selected range
  rangeMin = moment("000000", "hhmmss").valueOf();
  rangeMax = moment("000000", "hhmmss").valueOf();
  rangeVal = moment("000000", "hhmmss").valueOf();

  interval;

  // Currently playing data
  playing : boolean = false;

  sessions : Array<Session>;
  selectedSession : Session;

  // Reference to slider in view
  @ViewChild('slider', { static: true } ) slider: IonRangeSliderComponent;

  constructor(private chartService: ChartService,
              private imuVisualizer: ImuVisualizationService,
              private apiService: APIService) {
    this.segment = "force";
    this.imuVisualization.initialized = false;

    // Retrieve all of the current sessions from the DB
    this.apiService.ListSessions( undefined, 50 ).then( query => {
      this.sessions = query.items.map( item => <Session>{ name: item.name, id: item.id } );
      this.selectedSession = this.sessions[0];
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

  playorPause() {
    this.playing = !this.playing;
    if( this.playing ) {
      this.interval = setInterval( () => {
        this.rangeVal = this.rangeVal.valueOf() + 1000;
        this.slider.update({from: this.rangeVal});
      }, 1000 );
    } else {
      clearInterval( this.interval );
    }
  }

  pause() {
    this.playing = false;
    clearInterval( this.interval );
  }

  restart() {
    this.pause();
    this.rangeVal = this.rangeMin.valueOf() + 1;
    this.slider.update({from: this.rangeVal}); // Bug where this needs to be explicitly called even though it is dynamically modified by rangeVal
    clearInterval( this.interval );
  }

  sessionChanged( event ) {
    this.pause()

    // Set the new session
    this.selectedSession = event.detail.value; // Assign value 

    // Check if there is data for this session, if not retrieve it from the DB
    if( this.selectedSession.data == null ) {
      this.apiService.DataBySessionId( this.selectedSession.id, undefined, undefined, 1000 ).then( query => {
        console.log( query );
      });
    }

    // Calculate the start and end time for this session
  }
  sliderFormat( num ) {
    return moment( num ).format('HH:mm:ss');
  }

  sliderChange() {
    this.pause();
  }

  updateSliderRange() {
    this.rangeMax = moment("000000","hhmmss").add( moment.duration( this.end.diff( this.start ) ) ).valueOf()
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
  }

  ionViewDidEnter() {
    if( "imu" == this.segment ) {
      this.imuVisualizer.renderAnimation( this.imuVisualization );
    } else {
      this.chartService.reset( this.chart );
    }
  }

  ionViewDidLeave() {
    this.pause();
    clearInterval( this.chart.chartInterval );
    this.imuVisualizer.stopAnimation( this.imuVisualization );  
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChartService, Chart } from '../services/chart.service';
import { ImuVisualizationService, Visualization } from '../services/imu-visualization.service';
import { APIService } from '../services/api.service';
import {IonRangeSliderComponent} from "ng2-ion-range-slider";

import * as moment from 'moment';

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

  // Currently playing data
  playing : boolean = false;

  // Reference to slider in view
  @ViewChild('slider', { static: true } ) slider: IonRangeSliderComponent;

  constructor(private chartService: ChartService,
              private imuVisualizer: ImuVisualizationService,
              private apiService: APIService) {
    this.segment = "force";
    this.imuVisualization.initialized = false;
  }
  
  get startDate() : string {
    return this.start.toISOString();
  }

  set startDate( value : string ) {
    this.start = moment( value );
  }

  get endDate() : string {
    return this.end.toISOString();
  }

  set endDate( value : string ) {
    this.end = moment( value );
  }

  playorPause() {
    this.playing = !this.playing;
  }

  pause() {
    this.playing = false;
  }

  restart() {
    this.pause();
    this.rangeVal = this.rangeMin.valueOf() + 1;
    this.slider.update({from: this.rangeVal}); // Bug where this needs to be explicitly called even though it is dynamically modified by rangeVal
  }

  startDateValidation( $event ) {
    this.pause();
    if( this.startDate > this.endDate ) {
      this.end = this.start;
    }

    this.updateSliderRange();
  }

  endDateValidation( $event ) {
    this.pause();
    if( this.endDate < this.startDate ) {
      this.start = this.end;
    }

    this.updateSliderRange();
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

  ionViewDidEnter() {
    if( "imu" == this.segment ) {
  //    this.imuVisualizer.renderAnimation();
    } else {
      this.chartService.reset( this.chart );
    }
  }

  ionViewDidLeave() {
    clearInterval( this.chart.chartInterval );
    this.imuVisualizer.stopAnimation( this.imuVisualization );  
  }
}

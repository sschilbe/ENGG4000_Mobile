import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { SensorReadingsService } from '../services/sensor-readings.service';

import { ImuVisualizationService, Visualization } from '../services/imu-visualization.service';
import { ChartService, Chart } from '../services/chart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  segment: string;

  chart: Chart = {
    chartName: 'forceChartLive',
    chartInterval: null,
    chartRef: null,
    forceData: [
      {x: 3, y: 3, value: 0},
      {x: 4, y: 3, value: 0},
      {x: 5, y: 4, value: 0},
      {x: 6, y: 3, value: 0},
      {x: 7, y: 3, value: 0},
      {x: 6, y: 2, value: 0},
      {x: 5, y: 2, value: 0},
      {x: 4, y: 2, value: 0}
    ]
  };

  @ViewChild("imuVisualizationLive", { static: true } ) imuVisualizationRef: ElementRef;
  imuVisualization: Visualization = new Visualization();

  constructor(private sensorReadings: SensorReadingsService,
              private chartService: ChartService,
              private imuVisualizer: ImuVisualizationService) {
    this.segment = "force";
    this.imuVisualization.initialized = false;
  }

  ngOnInit() {
    this.sensorReadings.data.subscribe( data => {
      this.chartService.formatData( this.chart, data.slice(0, 8) );
    });

    this.imuVisualizer.setCanvasElement( this.imuVisualization, this.imuVisualizationRef );
  }

  onSegmentChanged() {
    if( "force" == this.segment ) {
      this.chartService.chart( this.chart );

      // De-init IMU visualization
      this.imuVisualizer.stopAnimation( this.imuVisualization );
    } else {
      // De-init Chart
      clearInterval( this.chart.chartInterval );

      if( !this.imuVisualization.initialized ) {
        this.imuVisualizer.initialiseWebGLObjectAndEnvironment( this.imuVisualization );
      }

      this.imuVisualizer.renderAnimation( this.imuVisualization );
    }
  }

  ionViewWillEnter() {
    if( "imu" == this.segment ) {
      this.imuVisualizer.renderAnimation( this.imuVisualization );
    } else {
      this.chartService.reset( this.chart );
    }
  }

  ionViewDidLeave() {
    clearInterval( this.chart.chartInterval );
    this.imuVisualizer.stopAnimation( this.imuVisualization );  
  }
}

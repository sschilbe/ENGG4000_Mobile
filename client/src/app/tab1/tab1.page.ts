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
    forceData: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0]]
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
      this.chartService.formatData( this.chart, data.slice(8) );
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

  ionViewDidEnter() {
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

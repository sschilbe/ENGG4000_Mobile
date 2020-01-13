import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { SensorReadingsService } from '../services/sensor-readings.service';

import { Sensor } from '../classes/item.class';
import { ImuVisualizationService } from '../services/imu-visualization.service';
import { ChartService } from '../services/chart.service';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  segment: string;

  forceChart = 'forceChartLive';
  @ViewChild("imuVisualizationLive", { static: true } ) imuVisualization: ElementRef;

  constructor(private sensorReadings: SensorReadingsService,
              private chartService: ChartService,
              private imuVisualizer: ImuVisualizationService) {
    this.segment = "force";
  }

  ngOnInit() {
    this.sensorReadings.forceData.subscribe( data => {
      this.chartService.formatData( data );
    });

    this.imuVisualizer.setCanvasElement( this.imuVisualization );
  }

  onSegmentChanged() {
    if( "force" == this.segment ) {
      this.chartService.chart( this.forceChart );

      // De-init IMU visualization
      this.imuVisualizer.stopAnimation();
    } else {
      // De-init Chart
      clearInterval( this.chartService.chartInterval );

      if( !this.imuVisualizer.initialized ) {
        this.imuVisualizer.initialiseWebGLObjectAndEnvironment();
      }

      this.imuVisualizer.renderAnimation();
    }
  }

  ionViewDidEnter() {
    if( "imu" == this.segment ) {
      this.imuVisualizer.renderAnimation();
    } else {
      this.chartService.reset( this.forceChart );
    }
  }

  ionViewDidLeave() {
    clearInterval( this.chartService.chartInterval );
    this.imuVisualizer.stopAnimation();  
  }
}

import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(Highcharts)

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  forceChart: any = null;
  chartInterval: any;
  forceData: any[] = [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0]];

  constructor() {

  }

  formatData( newData ) {
    for( let i in this.forceData ) {
      this.forceData[i][2] = newData[i];
    }
  }

  /* Must be called before utilizing any functionality within this service */
  init() {

  }

  /* When finished using this service, call this function */
  deinit() {

  }

  /* Chart the data */
  chart(chartId: String) {
    if( this.forceChart != null) {
      return
    }

    if( chartId === 'forceChartLive') {
      this.forceChart = Highcharts.chart('forceChartLive', {
        chart: {
          type: 'heatmap',
          animation: false,
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1
        },
  
        series: [{
          type: 'heatmap',
          name: 'Force Data',
          borderWidth: 1,
          data: [],
          dataLabels: {
            enabled: false, // Turn off the data labels
            color: '#FFFFFF',
            style: {
              fontSize: '24px'
            }
          }
        }],
  
        plotOptions: {
            series: {
              turboThreshold: 0
            }
        },
  
        title: {
          text: 'Force Data'
        },
  
        xAxis: {
        },
        yAxis: {
          title: null,
          reversed: true
        },
        colorAxis: {
          min: 0,
          stops: [
            [0, '#3060cf'],
            [0.5, '#fffbbc'],
            [0.9, '#c4463a']
          ],
          softMax: 100
        },
  
        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
        },
  
        exporting: {
          enabled: false
        },
  
        tooltip: {
          enabled: false
        }
      });
    } else {
      this.forceChart = Highcharts.chart('forceChartSaved', {
        chart: {
          type: 'heatmap',
          animation: false,
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1
        },
  
        series: [{
          type: 'heatmap',
          name: 'Force Data',
          borderWidth: 1,
          data: [],
          dataLabels: {
            enabled: false, // Turn off the data labels
            color: '#FFFFFF',
            style: {
              fontSize: '24px'
            }
          }
        }],
  
        plotOptions: {
            series: {
              turboThreshold: 0
            }
        },
  
        title: {
          text: 'Force Data'
        },
  
        xAxis: {
        },
        yAxis: {
          title: null,
          reversed: true
        },
        colorAxis: {
          min: 0,
          stops: [
            [0, '#3060cf'],
            [0.5, '#fffbbc'],
            [0.9, '#c4463a']
          ],
          softMax: 100
        },
  
        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
        },
  
        exporting: {
          enabled: false
        },
  
        tooltip: {
          enabled: false
        }
      });
    }
  }

  /* Chart the data, reset interval */
  reset( chartId: String) {
    this.chart( chartId );
    clearInterval( this.chartInterval );
    setInterval( () => {
      this.chartInterval = this.forceChart.series[0].setData( this.forceData, true, false, false );
    }, 20 );
  }
}

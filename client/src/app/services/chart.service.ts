import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(Highcharts)

export type Chart = {
  chartInterval: any;
  chartName: String;
  chartRef: any;
  forceData: any[];
};

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {

  }

  formatData( chart: Chart, newData ) {
    for( let i in chart.forceData ) {
      chart.forceData[i][2] = newData[i];
    }
  }

  /* Must be called before utilizing any functionality within this service */
  init() {

  }

  /* When finished using this service, call this function */
  deinit() {

  }

  /* Chart the data */
  chart( chart: Chart ) {
    if( chart.chartRef != null) {
      return
    }

    if( chart.chartName === 'forceChartLive') {
      chart.chartRef = Highcharts.chart('forceChartLive', {
        chart: {
          type: 'heatmap',
          animation: false,
          marginTop: 0,
          marginBottom: 80,
          plotBorderWidth: 1
        },
  
        series: [{
          type: 'heatmap',
          name: undefined,
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
          text: undefined
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
          max: 4095
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
      chart.chartRef = Highcharts.chart('forceChartSaved', {
        chart: {
          type: 'heatmap',
          animation: false,
          marginTop: 0,
          marginBottom: 30,
          plotBorderWidth: 1
        },
  
        series: [{
          type: 'heatmap',
          name: undefined,
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
          text: undefined
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
          softMax: 4095
        },
  
        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 220
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
  reset( chart: Chart ) {
    this.chart( chart );
    clearInterval( chart.chartInterval );
    setInterval( () => {
      chart.chartInterval = chart.chartRef.series[0].setData( chart.forceData, true, false, false );
    }, 20 );
  }
}

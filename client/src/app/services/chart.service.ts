import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts/highstock';
import Heatmap from 'highcharts/modules/heatmap';
import Tilemap from 'highcharts/modules/tilemap'
Heatmap(Highcharts)
Tilemap(Highcharts)

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
    console.log( "Format data: " + newData );
    for( let i in chart.forceData ) {
      chart.forceData[i].value = newData[i];
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
          type: 'tilemap',
          animation: false,
          marginTop: 0,
          marginBottom: 80,
          plotBorderWidth: 1
        },
  
        series: [{
          type: 'tilemap',
          tileShape: 'circle',
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
          text: undefined
        },
  
        xAxis: {
          visible: false
        },
        yAxis: {
          title: null,
          visible: false
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
          align: 'center',
          layout: 'horizontal',
          margin: 0,
          symbolWidth: 280
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
          plotBorderWidth: 1,
          scrollablePlotArea: {
            minWidth: 400,
            scrollPositionX: 1
          }
        },
  
        series: [{
          type: 'heatmap',
          name: 'Force Data',
          borderWidth: 1,
          data: [],
          dataLabels: {
            overflow: 'none',
            crop: true,
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
          categories: ['A', 'B', 'C', 'D', 'E'],
          scrollbar: {
            enabled: true
          }
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
          align: 'center',
          layout: 'horizontal',
          margin: 10,
          symbolWidth: 280
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
    chart.chartInterval = setInterval( () => {
      chart.chartRef.series[0].setData( chart.forceData, true, false, false );
    }, 20 );
  }
}

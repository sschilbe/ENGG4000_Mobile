import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts/highcharts';
import Heatmap from 'highcharts/modules/heatmap';
import Tilemap from 'highcharts/modules/tilemap'
import HighchartsBoost from "highcharts/modules/boost";

HighchartsBoost(Highcharts)
Heatmap(Highcharts)
Tilemap(Highcharts)

export type Chart = {
  chartInterval: any;
  chartName: String;
  chartRef: any;
  data: any[];
};

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {

  }

  formatData( chart: Chart, newData ) {
    for( let i in chart.data ) {
      chart.data[i].value = newData[i];
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
    } else if (chart.chartName === 'forceChartSaved') {
      chart.chartRef = Highcharts.chart('forceChartSaved', {
        chart: {
          type: 'heatmap',
          animation: false,
          marginTop: 0,
          marginBottom: 80,
          panning: {
            enabled: true
          },
          pinchType: 'x'
        },
        boost: {
          useGPUTranslations: true
        },
        series: [{
          type: 'heatmap',
          name: 'Force Data',
          boostThreshold: 500,
          states: {
            hover: {
              enabled: false
            }
          },
          data: chart.data,
          colsize: 14,
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
              turboThreshold: Number.MAX_VALUE
            }
        },
  
        title: {
          text: undefined
        },
  
        xAxis: {
          type: "datetime",
          showFirstLabel: false,
          dateTimeLabelFormats: {
            millisecond: '%M:%S.%L'
          }
        },
        yAxis: {
          title: null,
          //reversed: true,
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
          margin: 14,
          symbolWidth: 280
        },
  
        exporting: {
          enabled: false
        },
  
        tooltip: {
          enabled: false,
          followTouchMove: false
        }
      });

      chart.chartRef.zoomOut = function() {
        // Get the current extremes so the map doesn't shift back
        var extremes = chart.chartRef.xAxis[0].getExtremes();
        chart.chartRef.xAxis[0].setExtremes(extremes.min, extremes.min + Math.min( chart.data.length/8 * 14 - extremes.min, 1000*14 ) );
      }

    } else {
      // The data has been formatted into a nested array of the following format
      // [[[x,value],...],...] - This format allows for each axis of both the accelerometer and gyroscope
      // to be represented as it's own data series
      console.log( chart.data );

      let aX, aY, aZ, gX, gY, gZ;
      aX = chart.data[0];
      aY = chart.data[1];
      aZ = chart.data[2];
      gX = chart.data[3];
      gY = chart.data[4];
      gZ = chart.data[5];

      chart.chartRef = Highcharts.chart('imuChartSaved', {
        chart: {
          type: 'spline',
          scrollablePlotArea: {
            minWidth: 700
          }
        },

        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },

        series: [{
          type: 'spline',
          name: 'Acceleration (X)',
          yAxis: 0,
          data: aX
        },
        {
          type: 'spline',
          name: 'Acceleration (Y)',
          yAxis: 0,
          data: aY
        },
        {
          type: 'spline',
          name: 'Acceleration (Z)',
          yAxis: 0,
          data: aZ
        },
        {
          type: 'spline',
          name: 'Gyroscope (X)',
          yAxis: 1,
          data: gX
        },
        {
          type: 'spline',
          name: 'Gyroscope (Y)',
          yAxis: 1,
          data: gY
        },
        {
          type: 'spline',
          name: 'Gyroscope (Z)',
          yAxis: 1,
          data: gZ
        }],

        title: {
          text: undefined
        },
  
        xAxis: {
          type: "datetime",
          showFirstLabel: false,
          dateTimeLabelFormats: {
            millisecond: '%M:%S.%L'
          },
          width: "100%"
        },
        yAxis: [{
          title: {
            text: "Acceleration (g)"
          },
          labels: {
            align: 'right'
          }
        },
        {
          title: {
            text: "Rotation (Â°/s)"
          },
          labels: {
            align: 'left'
          },
          opposite: true,

        }],

        legend: {
          align: 'center',
          layout: 'horizontal',
          margin: 14,
          symbolWidth: 200
        },

        tooltip: {
          enabled: false,
          followTouchMove: false
        }
      });
    }
  }

  /* Chart the data, reset interval */
  reset( chart: Chart ) {
    this.chart( chart );
    clearInterval( chart.chartInterval );
    chart.chartInterval = setInterval( () => {
      chart.chartRef.series[0].setData( chart.data, true, false, false );
    }, 20 );
  }
}

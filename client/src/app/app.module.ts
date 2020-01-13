import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Other Imports */
// BLE
import { BLE } from '@ionic-native/ble/ngx';

import { HttpClientModule } from  '@angular/common/http';

// Charting
import { HighchartsChartModule } from 'highcharts-angular';

// Make the current sensor readings globally accessible
import { SensorReadingsService } from '../app/services/sensor-readings.service';

import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular'

import { IonRangeSliderModule } from 'ng2-ion-range-slider';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    IonRangeSliderModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BLE,
    SensorReadingsService,
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

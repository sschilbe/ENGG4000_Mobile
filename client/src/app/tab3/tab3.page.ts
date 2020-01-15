import { Component } from '@angular/core';
import { BleService } from '../services/ble.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  enabledInterval = null;
  constructor( private ble : BleService ) {

  }

  ionViewWillEnter() {
    this.ble.scannedDevices = [];
    //this.ble.connect( this.ble.wearable );
  }

  ionViewDidEnter() {
    this.ble.enabled();
    console.log( this.ble.wearable );
  }
}

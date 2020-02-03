import { Injectable, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx'
import { NavController, ToastController } from '@ionic/angular';
import { SensorReadingsService } from '../services/sensor-readings.service';
import { DataManagementService } from './data-management.service';

let not_connected = "Not Connected";

@Injectable({
  providedIn: 'root'
})
export class BleService {
  scannedDevices: any[] = [];
  statusMessage: string;

  wearable : any = {
    id: "00:A0:50:81:22:E0",
    name: not_connected
  };

  hmi : any = {
    id: "",
    name: not_connected
  };

  scanning: boolean = false;

  constructor(private ble: BLE,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ngZone: NgZone,
    private sensorReadings: SensorReadingsService,
    private dataManagement: DataManagementService ) {

  }

  scan() {
    this.scannedDevices = [];  // clear list

    this.scanning = true;
    this.ble.scan([], 5).subscribe( // scanning for 5 seconds on one tap
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout( () => this.scanning = false, 5000 );
  }

  connect( device ) {
    this.ble.connect( device.id ).subscribe(
      peripheralData => {
        this.wearable = peripheralData;
        console.log( peripheralData );

        // Request a larger MTU size to facilitate long characteristics
        this.ble.requestMtu(this.wearable.id, 40).then(() => {
          console.log("Accepted MTU size change");
        }, error => {
          console.log("Rejected MTU size change");
        });

        var index = this.scannedDevices.indexOf( device );
        if( index > -1 ) {
          this.scannedDevices.splice( index, 1 );
        }
        
        // Start a new session for managing data
        this.dataManagement.startNewSession();

        // Start Notifications for Force Sensor
        this.startDataNotifications();
      },
    
      error => { console.log('disconnected'); console.log( error ); }
    );
  }

  disconnect( device ) {
    this.ble.disconnect( device.id ).then( device => {
      // Stop recording data, end the session
      this.dataManagement.endSession();
      
      console.log( device );
    });

    this.wearable = {name: not_connected};
  }

  onDeviceDiscovered(device) {
    this.ngZone.run(() => {
      if( 'name' in device ) {
        this.scannedDevices.push(device); // filling the list with discovered list
      }
    });
  }

  // If location permission is denied, you'll end up here
  async scanError(error) {
    let toast = await this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

  startDataNotifications() {
    var device = this.wearable;
    this.ble.startNotification( device.id, device.characteristics[7].service, device.characteristics[7].characteristic ).subscribe(
      buffer => {
        console.log(buffer);
        var array = new Uint16Array(buffer);
        this.sensorReadings.updateData( array );
    });
  }

  async enabled() {
    this.ble.isEnabled().catch( await this.ble.enable().finally( () => {console.log( "BLE enabled" )} ) );
  }
}

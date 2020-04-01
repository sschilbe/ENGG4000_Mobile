import { Injectable, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx'
import { NavController, ToastController } from '@ionic/angular';
import { SensorReadingsService } from '../services/sensor-readings.service';
import { DataManagementService } from './data-management.service';
import { BehaviorSubject } from 'rxjs';

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

  scanning: boolean = false;
  notificationSubscription;
  connected: BehaviorSubject<boolean>;

  constructor(private ble: BLE,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ngZone: NgZone,
    private sensorReadings: SensorReadingsService,
    private dataManagement: DataManagementService ) {
    this.connected = new BehaviorSubject<boolean>(false);
  }

  scan() {
    this.scannedDevices = [];  // clear list

    this.scanning = true;
    this.ble.scan([], 5).subscribe( // scanning for 5 seconds on one tap
      device =>{ this.onDeviceDiscovered(device); console.log( device )}, 
      error => this.scanError(error)
    );

    setTimeout( () => this.scanning = false, 5000 );
  }

  connect( device ) {
    this.ble.connect( device.id ).subscribe(
      peripheralData => {
        this.wearable = peripheralData;
        this.connected.next( true );
        console.log( peripheralData );

        // Request a larger MTU size to facilitate long characteristics
        this.ble.requestMtu(device.id, 40).then(() => {
          console.log("Accepted MTU size change");
        }, error => {
          console.log("Rejected MTU size change");
        });

        var index = this.scannedDevices.indexOf( device );
        if( index > -1 ) {
          this.scannedDevices.splice( index, 1 );
        }

        // Artificial Delay for debugging and to ensure MTU size change has taken effect
        // Start Notifications for Force Sensor
        setTimeout(() => { this.startDataNotifications(); }, 1000);

        // Start a new session for managing data
        this.dataManagement.startNewSession();
      },

      error => { console.log('disconnected'); console.log( error ); this.connected.next( false ); }
    );
  }

  disconnect( device ) {
    this.notificationSubscription.unsubscribe();
    this.ble.disconnect( device.id ).then( device => {
      this.connected.next(false);
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
    console.log("Scan error");
    let toast = await this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

  startDataNotifications() {
    var device = this.wearable;
    this.notificationSubscription = this.ble.startNotification( device.id, device.characteristics[7].service, device.characteristics[7].characteristic ).subscribe(
      buffer => {
        var array = new Uint16Array(buffer);
        this.sensorReadings.updateData( array );
    }, error => {
      console.error( "Notification error: " + error );
    });
  }

  async enabled() {
    this.ble.startStateNotifications().subscribe( state => {
      if( state === "off" ) {
        this.ble.enable();
      }
    });

    this.ble.isEnabled().catch( await this.ble.enable().finally( () => {console.log( "BLE enabled" )} ) );
  }
}

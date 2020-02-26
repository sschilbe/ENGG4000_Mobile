import { Component } from '@angular/core';
import { BleService } from '../services/ble.service';
import { AlertController } from '@ionic/angular';
import { DataManagementService } from '../services/data-management.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  enabledInterval = null;
  constructor( private ble : BleService,
               private dataManagement: DataManagementService,
               public  alertController: AlertController ) {
    this.ble.enabled();
  }

  ionViewWillEnter() {
    this.ble.scannedDevices = [];
    //this.ble.connect( this.ble.wearable );
  }

  ionViewDidEnter() {
    console.log( this.ble.wearable );
  }
 
  saveSession() {
    this.ble.disconnect( this.ble.wearable );
    
    // Open popup to get session name
    this.presentSessionEndAlert();
  }

  /* Present alert to get user to connect device */
  async presentSessionEndAlert() {
    const alert = await this.alertController.create({
      header: 'End Session',
      message: 'Enter a title for this session.',
      backdropDismiss: false,
      inputs: [
        {
          name: "sessionTitle",
          type: "text"
        }
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: (alertData) => {
            // Stop recording data, end the session
            this.dataManagement.endSession(alertData.sessionTitle);
          }
        }
      ]
    });

    await alert.present();
  }
}

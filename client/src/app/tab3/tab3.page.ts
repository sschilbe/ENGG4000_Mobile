import { Component } from '@angular/core';
import { BleService } from '../services/ble.service';
import { AlertController } from '@ionic/angular';
import { DataManagementService } from '../services/data-management.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  enabledInterval = null;
  constructor( private ble : BleService,
               private dataManagement: DataManagementService,
               private db: DatabaseService,
               public  alertController: AlertController ) {
    this.ble.enabled();
  }

  ionViewWillEnter() {
    this.ble.scannedDevices = [];
    //this.ble.connect( this.ble.wearable );
  }

  ionViewDidEnter() {
    this.ble.enabled();
    console.log( this.ble.wearable );
  }
 
  saveSession() {
    this.ble.disconnect( this.ble.wearable );

    // Open popup to get session name
    this.presentSessionEndAlert();
  }

  /* Present alert to get user to connect device */
  async presentSessionEndAlert() {
    let alert : HTMLIonAlertElement = await this.alertController.create({
      header: 'End Session',
      message: '',
      backdropDismiss: false,
      inputs: [
        {
          name: "sessionTitle",
          placeholder: "Enter Title For Session",
          type: "text"
        }
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: (alertData) => {
            // Validate the session data here
          if( this.db.renameSession( this.dataManagement.currentSession.id, alertData.sessionTitle ) ) {
              // Stop recording data, end the session
              this.dataManagement.endSession();
            } else {
              // This styling is not actually working right now
              alert.message = "<font color='red'>Session name must be unique and not empty</font>"
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }
}

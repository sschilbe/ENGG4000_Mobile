import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

// Fancy Range Slider
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    IonRangeSliderModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}

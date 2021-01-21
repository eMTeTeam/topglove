import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';

import { MeasureNowPageRoutingModule } from './measure-now-routing.module';

import { MeasureNowPage } from './measure-now.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeasureNowPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [MeasureNowPage]
})
export class MeasureNowPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { GenerateReportPageRoutingModule } from './generate-report-routing.module';

import { GenerateReportPage } from './generate-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule,
    GenerateReportPageRoutingModule
  ],
  declarations: [GenerateReportPage]
})
export class GenerateReportPageModule { }

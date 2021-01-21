import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';

import { IonicModule } from '@ionic/angular';

import { GroupDashboardPageRoutingModule } from './group-dashboard-routing.module';

import { GroupDashboardPage } from './group-dashboard.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule,
    AvatarModule,
    GroupDashboardPageRoutingModule
  ],
  declarations: [GroupDashboardPage]
})
export class GroupDashboardPageModule { }

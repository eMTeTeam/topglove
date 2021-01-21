import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ChartistModule } from 'ng-chartist';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { AvatarModule } from 'ngx-avatar';

const avatarColors = ["#16438b"];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    AvatarModule,
    AvatarModule.forRoot({ colors: avatarColors }),
    ReactiveFormsModule,
    ChartistModule
  ],
  declarations: [
    Tab3Page]
})
export class Tab3PageModule { }

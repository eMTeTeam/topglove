import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ChartsModule } from 'ng2-charts';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { AvatarModule } from 'ngx-avatar';

const avatarColors = ['#16438b'];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    AvatarModule,
    AvatarModule.forRoot({ colors: avatarColors }),
    ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [
    Tab3Page]
})
export class Tab3PageModule { }

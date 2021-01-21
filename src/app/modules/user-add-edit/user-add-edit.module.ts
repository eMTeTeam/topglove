import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { UserAddEditPageRoutingModule } from './user-add-edit-routing.module';

import { UserAddEditPage } from './user-add-edit.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    UserAddEditPageRoutingModule
  ],
  declarations: [UserAddEditPage]
})
export class UserAddEditPageModule { }

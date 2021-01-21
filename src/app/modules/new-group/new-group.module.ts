import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGroupPageRoutingModule } from './new-group-routing.module';
import { AvatarModule } from 'ngx-avatar';
import { NewGroupPage } from './new-group.page';
import { MemberSelectionComponent } from '../../shared/member-selection/member-selection.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NewGroupPageRoutingModule,
    AvatarModule.forRoot()
  ],
  declarations: [NewGroupPage, MemberSelectionComponent],
  entryComponents: [MemberSelectionComponent]
})
export class NewGroupPageModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddEditPage } from './user-add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UserAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAddEditPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasureNowPage } from './measure-now.page';

const routes: Routes = [
  {
    path: '',
    component: MeasureNowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasureNowPageRoutingModule { }

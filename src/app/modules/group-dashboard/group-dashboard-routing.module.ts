import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupDashboardPage } from './group-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: GroupDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupDashboardPageRoutingModule {}

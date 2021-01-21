import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    children: [
      {
        path: 'group-dashboard',
        loadChildren: () => import('../../modules/group-dashboard/group-dashboard.module').then(m => m.GroupDashboardPageModule)
      },
      {
        path: 'generate-report',
        loadChildren: () => import('../../modules/generate-report/generate-report.module').then(m => m.GenerateReportPageModule)
      },
      {
        path: '',
        redirectTo: './tabs/tab3/group-dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule { }

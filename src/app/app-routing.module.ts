import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'group-details',
    loadChildren: () => import('./modules/group-details/group-details.module').then(m => m.GroupDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-add-edit',
    loadChildren: () => import('./modules/user-add-edit/user-add-edit.module').then(m => m.UserAddEditPageModule)
  },
  {
    path: 'new-group',
    loadChildren: () => import('./modules/new-group/new-group.module').then(m => m.NewGroupPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'measure-now',
    loadChildren: () => import('./modules/measure-now/measure-now.module').then(m => m.MeasureNowPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'about-us',
    loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./modules/configuration/configuration.module').then(m => m.ConfigurationPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'group-dashboard',
    loadChildren: () => import('./modules/group-dashboard/group-dashboard.module').then(m => m.GroupDashboardPageModule)
  },
  {
    path: 'generate-report',
    loadChildren: () => import('./modules/generate-report/generate-report.module').then(m => m.GenerateReportPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

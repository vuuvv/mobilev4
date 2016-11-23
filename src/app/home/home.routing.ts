import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent, HomeComponent } from './home.component';

import { NotifyComponent } from '../notify';
import { UserComponent } from '../user';

import { AuthorizeGuard } from '../shared';

const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user',
        canActivate: [AuthorizeGuard],
        component: UserComponent,
      },
      {
        path: 'notify',
        canActivate: [AuthorizeGuard],
        component: NotifyComponent,
      },
    ]
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
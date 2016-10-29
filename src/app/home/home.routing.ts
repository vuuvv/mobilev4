import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent, HomeComponent } from './home.component';

import { UserComponent } from '../user';
import { NotifyComponent } from '../notify';

import { AuthorizeGuard } from '../shared';

const userRoutes: Routes = [
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule',
  }
];

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
      ...userRoutes,
      {
        path: 'notify',
        canActivate: [AuthorizeGuard],
        component: NotifyComponent,
      },
    ]
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
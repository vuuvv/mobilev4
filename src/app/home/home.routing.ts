import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent, HomeComponent } from './home.component';

import { UserComponent } from '../user';
import { NotifyComponent } from '../notify';

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
        component: UserComponent,
      },
      {
        path: 'notify',
        component: NotifyComponent,
      },
    ]
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
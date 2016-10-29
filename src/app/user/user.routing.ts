import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthorizeGuard } from '../shared';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: '',
        component: UserComponent,
        pathMatch: 'full',
      }
    ]
  }
];

export const userRouting: ModuleWithProviders = RouterModule.forChild(routes);
import { ModuleWithProviders } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { AuthorizeGuard } from '../shared';

const routes: Routes = [{
  path: 'product',
  canActivate: [AuthorizeGuard],
  component: ProductComponent,
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
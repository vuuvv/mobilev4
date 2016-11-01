import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OverlayModule, PageModule, DialogModule } from '../../components';

import { StoreLayoutComponent, StoreComponent } from './store.component';
import { StoreSignupComponent } from './store-signup.component';
import { StoreBindComponent } from './store-bind.component';

import { AuthorizeGuard } from '../shared';

const routes: Routes = [
  {
    path: 'store',
    component: StoreLayoutComponent,
    canActivate: [AuthorizeGuard],
    children: [
      {
        path: '',
        component: StoreComponent,
      },
      {
        path: 'signup',
        component: StoreSignupComponent,
      },
      {
        path: 'bind',
        component: StoreBindComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,

    OverlayModule,
    PageModule,
    DialogModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    StoreLayoutComponent,
    StoreComponent,
    StoreSignupComponent,
    StoreBindComponent,
  ],
})
export class StoreModule {}

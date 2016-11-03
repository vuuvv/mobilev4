import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverlayModule, PageModule, DialogModule } from '../../components';

import { StoreLayoutComponent, StoreComponent } from './store.component';
import { StoreSignupComponent } from './store-signup.component';
import { StoreBindComponent } from './store-bind.component';
import { StoreEditComponent } from './store-edit.component';

import { AuthorizeGuard } from '../shared';

const routes: Routes = [
  {
    path: 'store',
    component: StoreLayoutComponent,
    canActivate: [AuthorizeGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
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
      {
        path: 'edit/:id',
        component: StoreEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

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
    StoreEditComponent,
  ],
})
export class StoreModule {}

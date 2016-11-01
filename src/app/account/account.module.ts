import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OverlayModule, PageModule, DialogModule, CoreModule } from '../../components';

import { AccountComponent } from './account.component';

import { AuthorizeGuard } from '../shared';

const routes: Routes = [
  {
    path: 'account',
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: '',
        component: AccountComponent,
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
    CoreModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    AccountComponent
  ],
})
export class AccountModule {}

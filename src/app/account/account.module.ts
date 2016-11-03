import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverlayModule, PageModule, DialogModule, CoreModule } from '../../components';

import { AccountComponent } from './account.component';
import { DepositComponent } from './deposit.component';

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
      {
        path: 'deposit',
        component: DepositComponent,
      }
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
    CoreModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    AccountComponent,
    DepositComponent,
  ],
})
export class AccountModule {}

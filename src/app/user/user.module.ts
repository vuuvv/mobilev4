import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OverlayModule, PageModule, DialogModule, CoreModule } from '../../components';

import { UserComponent } from './user.component';
import { QrComponent } from './qr.component';
import { SettingComponent } from './setting.component';

import { AuthorizeGuard } from '../shared';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: '',
        component: UserComponent,
        pathMatch: 'full',
      },
      {
        path: 'qr',
        component: QrComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    CoreModule,
    OverlayModule,
    PageModule,
    DialogModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    UserComponent,
    QrComponent,
    SettingComponent
  ],
})
export class UserModule {}
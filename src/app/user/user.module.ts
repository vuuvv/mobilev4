import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { OverlayModule, PageModule, DialogModule, CoreModule } from '../../components';

import { UserComponent } from './user.component';
import { QrComponent } from './qr.component';
import { SettingComponent } from './setting.component';
import { AreaComponent } from './area.component';
import { ProfileComponent } from './profile.component';
import { GenderComponent } from './gender.component';
import { PasswordComponent } from './password.component';

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
      {
        path: 'area',
        component: AreaComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'gender',
        component: GenderComponent,
      },
      {
        path: 'password',
        component: PasswordComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    SettingComponent,
    AreaComponent,
    ProfileComponent,
    GenderComponent,
    PasswordComponent,
  ],
})
export class UserModule {}
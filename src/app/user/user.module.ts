import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OverlayModule, PageModule, DialogModule, CoreModule } from '../../components';

import { UserComponent } from './user.component';
import { QrComponent } from './qr.component';

import { userRouting } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    CoreModule,
    OverlayModule,
    PageModule,
    DialogModule,

    userRouting,
  ],
  declarations: [
    UserComponent,
    QrComponent,
  ],
  exports: [
    UserComponent,
    QrComponent,
  ]
})
export class UserModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OverlayModule, PageModule, DialogModule } from '../../components';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    OverlayModule,
    PageModule,
    DialogModule,
  ],
  declarations: [
    UserComponent,
  ],
  exports: [
    UserComponent,
  ]
})
export class UserModule {}
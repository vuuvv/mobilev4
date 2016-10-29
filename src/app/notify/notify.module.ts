import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageModule, DialogModule } from '../../components';

import { NotifyComponent } from './notify.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    PageModule,
    DialogModule,
  ],
  declarations: [
    NotifyComponent,
  ],
  exports: [
    NotifyComponent,
  ],
})
export class NotifyModule {}
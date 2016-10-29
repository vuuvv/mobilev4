import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmComponent } from './confirm.component';
import { AlertComponent } from './alert.component';
import { DialogService } from './dialog.service';
import { OverlayService } from '../overlay';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent,
    ConfirmComponent,
  ],
  exports: [
    AlertComponent,
    ConfirmComponent,
  ],
  providers: [
    OverlayService,
    DialogService,
  ]
})
export class DialogModule {}
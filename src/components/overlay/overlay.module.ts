import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core';

import { OverlayService } from './overlay.service';

import { Overlay, OverlayComponent } from './overlay';

import { AlertComponent } from './alert.component';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  declarations: [
    Overlay,
    OverlayComponent,
    AlertComponent,
    ConfirmComponent,
  ],
  exports: [
    Overlay,
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
  ]
})
export class OverlayModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: [OverlayService],
    }
  }
}
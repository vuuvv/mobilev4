import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core';

import { OverlayService } from './overlay.service';

import { Overlay, OverlayComponent } from './overlay';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  declarations: [
    Overlay,
    OverlayComponent,
  ],
  exports: [
    Overlay,
  ],
})
export class OverlayModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: [OverlayService],
    }
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPILER_PROVIDERS } from '@angular/compiler';

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
  providers: [
    COMPILER_PROVIDERS,
    OverlayService,
  ]
})
export class OverlayModule {}
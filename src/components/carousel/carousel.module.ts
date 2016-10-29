import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core';

import { CarouselComponent } from './carousel.component';
import { SliderComponent } from './slider.component';

@NgModule({
  imports: [
    CommonModule,

    CoreModule,
  ],
  declarations: [
    CarouselComponent,
    SliderComponent,
  ],
  exports: [
    CarouselComponent,
    SliderComponent,
  ],
})
export class CarouselModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PAGE_COMPONENTS } from './page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    PAGE_COMPONENTS,
  ],
  exports: [
    PAGE_COMPONENTS,
  ],
})
export class PageModule {}
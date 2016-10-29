import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OverlayModule, PageModule, DialogModule } from '../../components';
import { SharedModule } from '../shared';
import { ProductComponent } from './product.component';

import { routing } from './product.routing';

@NgModule({
  imports: [
    RouterModule,

    OverlayModule,
    PageModule,
    DialogModule,

    SharedModule,

    routing,
  ],
  declarations: [
    ProductComponent,
  ],
  providers: [
  ],
})
export class ProductModule {}
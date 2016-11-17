import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoreModule, OverlayModule, PageModule, DialogModule, CarouselModule, InfiniteScrollModule } from '../../components';

import { AuthorizeGuard, SharedModule } from '../shared';

import { OrdersComponent } from './orders.component';
import { OrderItemComponent } from './order-item.component';

const routing: Routes = [
  {
    path: 'order',
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OrdersComponent,
      }
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    CoreModule,
    OverlayModule,
    PageModule,
    DialogModule,
    InfiniteScrollModule,

    SharedModule,

    RouterModule.forChild(routing),
  ],
  declarations: [
    OrdersComponent,
    OrderItemComponent,
  ]
})
export class OrderModule {
}
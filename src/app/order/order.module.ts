import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule, OverlayModule, PageModule, DialogModule, CarouselModule, InfiniteScrollModule } from '../../components';

import { AuthorizeGuard, SharedModule } from '../shared';

import { OrderComponent} from './order.component';
import { OrderItemComponent } from './order-item.component';

import { OrdersComponent } from './orders.component';
import { OrderSyncComponent } from './order-sync.component';

const routing: Routes = [
  {
    path: 'order',
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: 'list/:state',
        pathMatch: 'full',
        component: OrdersComponent,
      },
      {
        path: 'sync',
        pathMatch: 'full',
        component: OrderSyncComponent,
      }
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    CoreModule,
    OverlayModule,
    PageModule,
    DialogModule,
    InfiniteScrollModule,

    SharedModule,

    RouterModule.forChild(routing),
  ],
  declarations: [
    OrderComponent,
    OrderItemComponent,
    OrdersComponent,
    OrderSyncComponent,
  ]
})
export class OrderModule {
}
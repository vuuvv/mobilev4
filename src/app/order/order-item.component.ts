import { Component, Input } from '@angular/core';

import { OrderItem, OrderService } from '../shared';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.less'],
})
export class OrderItemComponent {
  @Input('orderItem') orderItem: OrderItem = new OrderItem();

  constructor(private orderService: OrderService) {
  }
}

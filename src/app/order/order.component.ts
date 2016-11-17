import { Component, Input } from '@angular/core';

import { Order } from '../shared';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent {
  @Input('order') order: Order = new Order();
}
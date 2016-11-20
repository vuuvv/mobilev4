import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Order, OrderService } from '../shared';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent {
  @Input('order') order: Order = new Order();
  @Input('index') index: number;
  @Input('canCheck') canCheck: boolean = false;

  constructor(private orderService: OrderService) {
  }

  get id() {
    return `HJN_ORDER_${this.index}`;
  }

  can(action: string): boolean {
    switch(action) {
      case 'pay':
        return ['待付款提交'].indexOf(this.order.State) != -1;
      case 'submit':
        return ['付款待提交'].indexOf(this.order.State) != -1;
      case 'refund':
        return ['仓库预处理', '付款待提交', '待仓库交寄'].indexOf(this.order.State) != -1;
    }
  }
}
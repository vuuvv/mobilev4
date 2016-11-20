import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store, Order, OrderItem, OrderService } from '../shared';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class OrdersComponent {
  private state: string;
  private keywords: string;

  private orders: Order[] = [];
  private page: number = 1;
  private pageSize: number = 10;

  private selectedOrders = {};

  private loading = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.state = params['state'];
      this.orders = [];
      this.page = 1;
      this.getOrderList();
    })
  }

  getOrderList() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.orderService.getOrderList(this.state, this.keywords, this.page, this.pageSize).subscribe((value: Order[]) => {
      this.orders = this.orders.concat(value);
      this.loading = false;
      this.page++;
    });
  }

  select(i: number) {
    this.selectedOrders[i] = this.orders[i];
  }

  unselect(i: number) {
    delete this.selectedOrders[i];
  }

  selectAll(event) {
    if (event.target.checked) {
      this.orders.filter((value) => {
        return this.state != 'unpay' || !this.orderService.cannotPay(value);
      }).forEach((value) => value.$$Checked = true);
    } else {
      this.orders.forEach((value) => value.$$Checked = false);
    }
  }

  totalCount(): number {
    if (!this.orders) {
      return 0;
    }
    return this.orders.filter((value) => value.$$Checked).length;
  }

  totalPrice() {
    if (!this.orders) {
      return 0;
    }
    return this.orders.filter((value) => value.$$Checked).reduce((a, b) => {
      return a + this.orderService.totalFee(b);
    }, 0);
  }

  totalFreight() {
    if (!this.orders) {
      return 0;
    }
    return this.orders.filter((value) => value.$$Checked).reduce((a, b) => {
      return a + b.AllFreight;
    }, 0);
  }

  sync() {
  }
}
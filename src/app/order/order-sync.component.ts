import { Component, OnInit } from '@angular/core';

import { OrderService, Store, OrderSyncItem } from '../shared';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';

class Progress {
  completed: number = 0;
  orders: OrderSyncItem[] = [];

  constructor(orders: OrderSyncItem[] = []) {
    this.orders = orders;
  }

  toString() {
    if (!this.orders || this.completed >= this.orders.length) {
      return "已完成";
    }
    return `${this.completed}/${this.orders.length}`;
  }
}

@Component({
  templateUrl: './order-sync.component.html',
  styleUrls: ['./order-sync.component.less'],
})
export class OrderSyncComponent implements OnInit {
  private progress: {[key:string]: Progress} = {};

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    // Observable.from(this.orderService.stores).concatMap((s) => {
    //   return this.orderService.syncList(s);
    // }).map((value) => {
    //   value[0].
    //   this.progress[]
    // })
    // this.orderService.stores.forEach((s) => {
    //   this.orderService.syncList(s).subscribe((value) => {
    //     this.progress[s.StoreCode] = new Progress(value);
    //   });
    // })
  }

  getProgress(store: Store) {
    let p = this.progress[store.Id];
    return p ? p : new Progress();
  }
}

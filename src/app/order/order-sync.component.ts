import { Component, OnInit } from '@angular/core';

import { OrderService, Store, OrderSyncItem } from '../shared';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';

class Progress {
  init: boolean = true;
  completed: number = 0;
  errorCount: number = 0;
  orders: OrderSyncItem[] = [];

  constructor(orders: OrderSyncItem[] = []) {
    this.orders = orders;
  }

  done() {
    this.init = false;
    this.completed++;
  }

  error() {
    this.done();
    this.errorCount++;
  }

  isdone() {
    return this.completed >= this.orders.length;
  }

  toString() {
    if (this.init) {
      return '等待中';
    }
    if (!this.orders || this.completed >= this.orders.length) {
      return `已完成, 成功: ${this.completed - this.errorCount}, 失败: ${this.errorCount}`;
    }
    let ret = `${this.completed}/${this.orders.length}`;
    if (this.errorCount) {
      ret += `, 错误: ${this.errorCount}`;
    }

    return ret;
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
    Observable.from(this.orderService.stores).concatMap((s) => {
      return this.orderService.syncList(s);
    }).concatMap((value) => {
      let p = this.progress[value.store.StoreCode] = new Progress(value.items);
      p.init = false;
      return Observable.from(value.items).concatMap((item: OrderSyncItem) => {
        return this.orderService.sync(item, value.store);
      });
    }).subscribe((value) => {
      let p = this.progress[value.LoginId];
      if (p) {
        value.Success ? p.done() : p.error();
      }
    })
    // this.orderService.stores.forEach((s) => {
    //   this.orderService.syncList(s).subscribe((value) => {
    //     this.progress[s.StoreCode] = new Progress(value);
    //   });
    // })
  }

  getProgress(store: Store) {
    let p = this.progress[store.StoreCode];
    return p ? p : new Progress();
  }
}

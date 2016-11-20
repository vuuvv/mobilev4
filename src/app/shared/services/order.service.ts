import { Injectable } from '@angular/core';

import { Http } from './http';
import { Store, Order, OrderItem, OrderSyncItem, OrderSyncItems } from '../models';
import { AuthorizeService } from './authorize';

import { Observable } from 'rxjs/Observable';

const OrderStatus = {
  '待付款提交': '0d37dddb080e4bcb824c6f1f74d9e7de',
  '付款待提交': '49f5a959aea94c129e6d0bffad5e0594',
  '仓库预处理': '4ce66094c8d64d11a1b01948aa8e56b1',
  '待仓库交寄': 'd91cbb4902154a25904r93bd193191y2',
  '仓库已发货': '747d203236fc40528820ada0848a7c8b',
  '待退单退款': '81c460f1f41943479af44cb2af9e4798',
  '已退单退款': 'd91cbb4902154a25904393bd193191f2',
  '退单待退款': '06b810ab1c9c44ca8cf3f916c143850d',
};

const LocalState = {
  'all': [],
  'unpay': ['待付款提交'],
  'warehouse': ['付款待提交', '仓库预处理', '待仓库交寄'],
  'delivered': ['仓库已发货'],
  'error': ['待退单退款', '已退单退款', '退单待退款'],
}

@Injectable()
export class OrderService {
  constructor(private http: Http, private authorizeService: AuthorizeService) {
  }

  get stores(): Store[] {
    return this.authorizeService.user.stores;
  }

  getOrderList(state: string, keyword: string, page: number = 1, pagesize: number = 10): Observable<Order[]> {
    return this.http.get<Order[]>('mo/orders', {state: this.getOrderStatusIds(state).join(','), keyword, page, pagesize});
  }

  getOrderStatusIds(state: string) {
    let local = LocalState[state];
    if (!local) {
      return [];
    }

    return local.map((value) => {
      return OrderStatus[value];
    });
  }

  getOrderItemImage(item: OrderItem) {
    if (!item || !item.ProductImageUrl) {
      return null;
    }

    if (!item.ProductImageUrl.startsWith('http')) {
      return `http://order.huijinet.com${item.ProductImageUrl}`;
    }

    return item.ProductImageUrl;
  }

  totalFee(order: Order) {
    if (!order || !order.DetailList) {
      return 0;
    }

    let total = order.DetailList.reduce((a, b) => {
      return a + b.ProductPrice
    }, 0)

    return total + order.AllFreight;
  }

  totalCount(order: Order) {
    if (!order || !order.DetailList) {
      return 0;
    }

    return order.DetailList.reduce((a, b) => {
      return a + b.BeSendNum;
    }, 0)
  }

  getStore(order: Order) {
    return this.stores.find((store) => {
      return store.StoreCode == order.StoreCode
    });
  }

  getStoreName(order: Order) {
    if (!order) {
      return '';
    }
    let store = this.getStore(order);
    if (store) {
      return `${store.PlatformName}(${store.StoreName})`;
    } else {
      return order.StoreCode;
    }
  }

  cannotPay(order: Order) {
    return order.State === '待付款提交' && this.totalFee(order) === 0;
  }

  syncList(store: Store): Observable<OrderSyncItems> {
    return this.http.get<OrderSyncItem[]>('mo/synclist', {store: store.StoreCode,}).map((value) => {
      return {
        store: store,
        items: value,
      }
    });
  }

  sync(order: OrderSyncItem, store: Store): Observable<OrderSyncItem> {
    return this.http.get<boolean>('mo/syncorder', {
      OrderCode: order.OrderId,
      StoreCode: order.LoginId,
      EPlatform: order.Platform,
    }).map((value) => { return {
          OrderId: order.OrderId, OrderStatus: order.OrderStatus, LoginId: store.StoreCode, Platform: store.RetailPlatform, Success: value,
       }
    });
  }

  payOrder(orderCode: string) {
    return this.http.post('mo/orderpay', {
      HMBOrderCode: orderCode,
    })
  }

  submitOrder(orderCode: string) {
    return this.http.post('mo/submitorder', {
      HMBOrderCode: orderCode,
    })
  }

  cancelOrder(orderCode: string) {
    return this.http.post('mo/cancelorder', {
      HMBOrderCode: orderCode,
    })
  }
}
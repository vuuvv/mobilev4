import { Injectable } from '@angular/core';

import { Http } from './http';
import { Order} from '../models';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }

  getOrderList(status: any, start: number, count: number): Observable<Order> {
    return this.http.get<Order>('mo/orders', {status, start, count});
  }
}
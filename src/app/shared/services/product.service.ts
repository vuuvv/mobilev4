import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Category, Product, Node } from '../models';
import { Http } from './http';

@Injectable()
export class ProductService {
  private categories: Node<Category>[];
  private mainCategories: Category[];

  constructor(private http: Http) {
  }

  getCategories(): Observable<Node<Category>[]> {
    if (this.categories) {
      return Observable.of(this.categories);
    }

    return this.http.get<Category[]>('mo/categories').map((value: Category[]) => {
      this.categories = Node.create(value, 'Id', 'ParentId');
      return this.categories;
    });
  }

  getMainCategories(): Observable<Category[]> {
    if (this.mainCategories) {
      return Observable.of(this.mainCategories);
    }

    return this.getCategories().map((value: Node<Category>[]) => {
      var ret: Category[] = [];

      for (let k of value) {
        if (k.children) {
          for (let n of k.children) {
            if (n.value.Name !== '其他') {
              ret.push(n.value);
            }
          }
        }
      }

      this.mainCategories = ret;

      return ret;
    })
  }

  getProducts(start: number = 0, count: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>('mo/products', {start, count});
  }
}
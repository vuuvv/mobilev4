import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Category, Product, Node, Store } from '../models';
import { Http } from './http';
import { AuthorizeService } from './authorize';

@Injectable()
export class ProductService {
  private categories: Node<Category>[];
  private mainCategories: Category[];
  private stores: Store[] = [];

  constructor(private http: Http, private authorizeService: AuthorizeService) {
    this.stores = authorizeService.user.stores;
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

  canPublish(product: Product): boolean {
    return !!this.getUnpublishStores(product).length;
  }

  getUnpublishStores(product: Product): Store[] {
    if (!product) {
      return [];
    }
    let ret = this.stores && this.stores.length;
    if (ret) {
      if (!product.storeList || !product.storeList.length) {
        return this.stores;
      }
      let ss = [];
      for (let s of this.stores) {
        if (product.storeList.findIndex(value => value['StoreId'] == s.StoreCode) == -1) {
          ss.push(s);
        }
      }
      return ss;
    } else {
      return [];
    }
  }

  getUnpublishStoreIds(product: Product): string[] {
    return this.getUnpublishStores(product).map((value) => {
      return value.StoreCode;
    });
  }

  getPublishedStore(product: Product): Store[] {
    if (product && product.storeList && product.storeList.length) {
      this.stores.filter((value: Store) => {
        return product.storeList.findIndex(s => s['StoreId'] == value.StoreCode) != -1;
      })
    } else {
      return [];
    }
  }

  getProducts(page: number = 1, pageSize: number = 10, goryId: string="", keywords:string="", choiceStatus:string = "0"): Observable<Product[]> {
    return this.http.get<Product[]>('mo/products', {
      start: page,
      num: pageSize,
      goryId,
      keywords,
      choiceStatus,
    });
  }

  getProduct(spu: string): Observable<Product> {
    return this.http.get<Product>(`mo/product/${spu}`);
  }

  getPublishProductDetail(spu: string, store: Store): Observable<Product> {
    return this.http.get<Product>('mo/publish/detail', {
      hmbspucode: spu,
      storeId: store.StoreCode,
      retailPlatform: store.RetailPlatform,
    });
  }

  getPublishedProducts(store: Store, keywords: string = "", start = 1, num = 10): Observable<Product[]> {
    return this.http.get<Product[]>('mo/published', {
      retailPlatform: store.RetailPlatform,
      storeCode: store.StoreCode,
      keywords,
      start,
      num
    });
  }

  selectProduct(spu: string): Observable<any> {
    return this.http.post(`mo/select/${spu}`);
  }

  publishProduct(data: any): Observable<any> {
    return this.http.post('mo/publish', data);
  }
}
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router, Event } from '@angular/router';

import { Node, Category, Http, ProductService, Product, Store, AuthorizeService } from '../shared';
import { DialogService, OverlayService, TouchDragDirective } from '../../components';

type State = 'list' | 'detail' | 'stores' | 'publish';

@Component({
  selector: 'product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent implements OnInit {
  @ViewChild('categories') categoriesDom: TouchDragDirective;
  private state: State = 'list';

  private categories: Node<Category>[] = [];
  private mainCategories: Category[] = [];

  private products: Product[] = [];
  private page = 1;
  private pageSize = 10;
  private category: string;
  private keywords = "";

  private detailSpu: string;
  private product:Product;

  private stores: Store[] = [];
  private selectStore: Store;

  private publishSpu: string;
  private publishProduct: Product;
  private publishStore: Store;

  private loading = false;

  constructor(
    private elementRef: ElementRef,
    private authorizeService: AuthorizeService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private overlayService: OverlayService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.stores = this.authorizeService.user.stores;
    this.route.params.forEach((params: Params) => {
      this.dispatch(params);
      setTimeout(() => {
        this.active();
      }, 300);
    })

    this.productService.getCategories().subscribe((value) => {
      this.categories = value;
    })

    this.productService.getMainCategories().subscribe((value) => {
      this.mainCategories = value;
    });
  }

  dispatch(params: Params) {
    this.state = params['state'] || 'list';
    switch(this.state) {
      case 'detail':
        this.viewDetail(params['product']);
        break;
      case 'stores':
        break;
      case 'publish':
        this.viewPublish(params['product'], params['store'])
        break;
      default:
        // list
        this.viewList(params['category'], params['keywords']);
        return;
    }
  }

  active() {
    let e = this.elementRef.nativeElement.querySelector('.categories a.active')
    if (e) {
      this.categoriesDom.moveX(-e.offsetLeft + 150);
    }
  }

  private sameRoute(category: string, keywords: string): boolean {
    return this.category === category && this.keywords === keywords;
  }

  getProducts() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.productService.getProducts(this.page, this.pageSize, this.category, this.keywords).subscribe((value) => {
      this.products = this.products.concat(value);
      this.loading = false;
      this.page++;
    });
  }

  viewList(category: string, keywords: string) {
    category = category || '0';
    if (!this.sameRoute(category, keywords) || !this.products.length) {
      this.category = category;
      this.keywords = keywords;
      console.log('refresh');
      this.products = [];
      this.page = 1;
      this.getProducts();
    }
  }

  viewDetail(spu: string) {
    if (!spu) {
      this.alertAndBack("无效的产品");
      return;
    }
    if (!this.product || this.product.hmbspucode != spu) {
      this.productService.getProduct(spu).subscribe((value: Product) => {
        if (!value.hmbspucode) {
          this.alertAndBack("无效的产品");
          return;
        } else {
          this.product = value;
        }
      });
    }
  }

  viewPublish(spu: string, storeId: string) {
    if (!spu) {
      this.alertAndBack("无效的产品");
      return;
    }
    if (!storeId) {
      this.alertAndBack("无效的店铺");
      return;
    }
    let store = this.publishStore = this.getStore(storeId);
    if (!store) {
      this.alertAndBack("无效的店铺");
      return;
    }
    if (!this.publishProduct || this.publishProduct.hmbspucode != spu) {
      this.productService.getPublishProductDetail(spu, store).subscribe((value: Product) => {
        if (!value.hmbspucode) {
          this.alertAndBack("无效的产品");
          return;
        } else {
          this.publishProduct = value;
        }
      });
    }
  }

  private alertAndBack(msg: string) {
      this.dialogService.alert(msg);
      this.location.back();
  }

  getStore(storeId: string) {
    return this.stores.find((store) => {
      return store.StoreCode == storeId
    });
  }

  go(state: string, params: any = {}) {
    this.router.navigate([`/product/home/${state}`, params]);
  }

  showProduct(spu: string) {
    this.go('detail', {product:spu});
  }

  showStores(spu) {
    this.publishSpu = spu;
    if (this.product.onsale === "1") {
      this.go('stores');
    } else {
      this.productService.selectProduct(this.product.hmbspucode).subscribe(() => {
        this.go('stores');
      })
    }
  }

  showPublish(store: Store) {
    this.go('publish', {product: this.publishSpu, store: store.StoreCode});
  }
}
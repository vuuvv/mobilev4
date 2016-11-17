import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product, ProductService } from '../shared';
import { CarouselConfig } from '../../components';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
})
export class ProductDetailComponent {
  @Input('product') product: Product = new Product();
  @Output('publish') onPublish: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) {
  }

  getTitle(product: Product): string {
    if (!product) {
      return null;
    }
    return product.item_name || product.item_desc;
  }

  getDesc(product: Product): string {
    if (!product) {
      return null;
    }
    return product.item_desc || product.item_name;
  }

  publish() {
    if (this.product) {
      this.onPublish.emit(this.product.hmbspucode);
    }
  }

  get isPublish(): boolean {
    return !!this.product && !!this.product.skuList && !!this.product.skuList.length;
  }

  get isOnSale(): boolean {
    return !this.product || this.isPublish || this.product.onsale === '1';
  }

  get publishButtonColor(): string {
    return this.productService.canPublish(this.product) ? 'red' : 'grey';
  }
}
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';

import { Product, PublishProduct, Store, ProductService } from '../shared';

@Component({
  selector: 'product-publish',
  templateUrl: './product-publish.component.html',
  styleUrls: ['product-detail.component.less'],
})
export class ProductPublishComponent implements OnChanges {
  @Input('store') store: Store;
  @Input('product') product: Product;
  @Output('publish') onPublish: EventEmitter<string> = new EventEmitter<string>();

  private publishProduct: PublishProduct = new PublishProduct();

  constructor(private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.product) {
      this.publishProduct.subject = this.getTitle(this.product);
      this.publishProduct.spuPrice = this.product.balancePrice;
      this.publishProduct.storeId = this.store.StoreCode;
      if (this.product.skuList && this.product.skuList.length) {
        for (let sku of this.product.skuList) {
          this.publishProduct.skus.push({
            skuId: sku.hmbskucode,
            sku: sku.hmbskucode,
            title: sku.title,
            skuPrice: this.publishProduct.spuPrice,
          });
        }
      }
    }
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

  submit() {
    this.productService.publishProduct({
      json: JSON.stringify(this.publishProduct),
    }).subscribe(() => null);
  }
}
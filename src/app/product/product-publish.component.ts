import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Product, PublishProduct, PublishSku, Store, ProductService } from '../shared';
import { DialogService, OverlayService } from '../../components';

class Category {
  cate_id: number;
  cate_name: string;
  sort_num: number;
  $$checked: boolean = false;
}

@Component({
  selector: 'product-publish',
  templateUrl: './product-publish.component.html',
  styleUrls: ['product-detail.component.less'],
})
export class ProductPublishComponent implements OnChanges {
  @Input('store') store: Store;
  @Input('product') product: Product;
  @Output('publish') onPublish: EventEmitter<string> = new EventEmitter<string>();

  private cateList: Category[] = [];
  private publishProduct: PublishProduct = new PublishProduct();

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.product) {
      this.publishProduct.subject = this.getTitle(this.product);
      this.publishProduct.spuPrice = +(this.product.balancePrice * 1.3).toFixed(2);
      this.publishProduct.storeId = this.store.StoreCode;
      this.publishProduct.spu_id = this.product.id;
      if (this.product.cateList) {
        this.cateList = [];
        for(let cate of this.product.cateList) {
          this.cateList.push({
            cate_id: cate['cate_id'],
            cate_name: cate['cate_name'],
            sort_num: cate['sort_num'],
            $$checked: false,
          });
        }
      }
      if (this.product.skuList && this.product.skuList.length) {
        for (let sku of this.product.skuList) {
          this.publishProduct.skus.push({
            skuId: sku.id,
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

  getCheckedCategory(): Category[] {
    if (!this.cateList) {
      return [];
    }
    return this.cateList.filter(value => value.$$checked)
  }

  goto(selector) {
    let dom = document.querySelector(`a[name=${selector}]`);
    if (dom) {
      dom.parentElement.scrollIntoView();
    }
  }

  get profit() {
    if (!this.product) {
      return 0;
    }
    if (!this.publishProduct) {
      return 0;
    }

    return this.publishProduct.spuPrice - this.product.balancePrice;
  }

  submit() {
    if (!this.product || !this.publishProduct) {
      this.dialogService.alert("正在加载数据，请稍后");
      return;
    }

    console.log(this.publishProduct);
    console.log(this.cateList);

    if (!this.publishProduct.subject) {
      this.goto('title');
      this.dialogService.alert("请填写标题");
      return;
    }

    let cate = this.getCheckedCategory();
    if (!cate.length) {
      this.goto('category');
      this.dialogService.alert("请选择类型");
      return;
    }
    this.publishProduct.cateIds = cate.map((v) => v.cate_id).join(',');

    this.publishProduct.skus = [];

    if (this.product.skuList && this.product.skuList.length) {
      for(let sku of this.product.skuList) {
        this.publishProduct.skus.push({
          skuId: sku.id,
          skuPrice: this.publishProduct.spuPrice,
        });
      }
    }

    this.dialogService.confirm(`您的产品的利润为¥${this.profit.toFixed(2)}, 确定提交吗？`).ok((comp) => {
      comp.close();
      this.overlayService.loading('正在上架产品，请稍候...');
      console.log(this.publishProduct);
      this.productService.publishProduct({
        json: JSON.stringify(this.publishProduct),
      }).subscribe(() => {
        this.overlayService.toast();
        this.router.navigate(['/product/onsale/list']);
      }, () => this.overlayService.hideToast());
    }).cancel((comp) => {
      this.goto('category');
      comp.close();
    })
    return;
    // this.productService.publishProduct({
    //   json: JSON.stringify(this.publishProduct),
    // }).subscribe(() => null);
  }
}
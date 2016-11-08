import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Product, ProductService } from '../shared';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  private products: Product[];
  private loading = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((value) => {
      this.products = value;
    });
  }

  search() {
    console.log('value change');
    this.productService.getProducts().subscribe((value) => {
      this.products = value;
    })
  }

  onScrollDown() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.productService.getProducts().subscribe((value) => {
      this.products = this.products.concat(value);
      this.loading = false;
    })
  }
}
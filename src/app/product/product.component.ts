import { Component, OnInit } from '@angular/core';

import { Node, Category, Http, ProductService, Product } from '../shared';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent implements OnInit {
  private categories: Node<Category>[];
  private mainCategories: Category[];
  private products: Product[];
  private loading = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getCategories().subscribe((value) => {
      this.categories = value;
    })

    this.productService.getMainCategories().subscribe((value) => {
      this.mainCategories = value;
    });

    this.productService.getProducts().subscribe((value) => {
      this.products = value;
    });
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
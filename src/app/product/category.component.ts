import { Component, OnInit } from '@angular/core';

import { Node, Category, ProductService } from '../shared';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit {
  private categories: Node<Category>[];
  private current: Node<Category>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getCategories().subscribe((value) => {
      this.categories = value;
      this.current = value[0];
    })
  }

  active(category) {
    this.current = category;
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../shared';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.html',
  styleUrls: ['./product-list-item.less'],
})
export class ProductListItem {
  @Input('product') product: Product = new Product();
  @Output('select') onSelect: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('open') onOpen: EventEmitter<string> = new EventEmitter<string>();
  selected: boolean = false;

  select() {
    this.selected = !this.selected;
    this.onSelect.emit(this.selected);
  }

  open(spu: string) {
    this.onOpen.emit(spu);
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '../shared';

@Component({
  selector: 'product-select-store',
  templateUrl: './stores.component.html',
})
export class ProductSelectStoreComponent {
  @Input('stores') stores: Store[] = [];
  @Output('select') onSelect: EventEmitter<Store> = new EventEmitter<Store>();

  select(store: Store) {
    this.onSelect.emit(store);
  }
}
import { Component, OnInit } from '@angular/core';

import { Platform, StoreService } from '../shared';

@Component({
  templateUrl: './store-bind.component.html',
  styleUrls: ['./store.component.less'],
})
export class StoreBindComponent implements OnInit {
   platforms: Platform[];

   constructor(private storeService: StoreService) {
   }

   ngOnInit() {
    this.storeService.getVisiblePlatforms().subscribe((value: Platform[]) => {
      console.log(value);
      this.platforms = value;
    });
   }
}
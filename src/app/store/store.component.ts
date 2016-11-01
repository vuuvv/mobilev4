import { Component, OnInit } from '@angular/core';

import { Store, Platform, StoresInfo, StoreService } from '../shared';

import { Observable } from 'rxjs/Observable';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class StoreLayoutComponent { }

@Component({
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less'],
})
export class StoreComponent implements OnInit {
  stores: Store[];
  platforms: Platform[];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storeService.getData().subscribe((value: StoresInfo) => {
      this.stores = value.stores;
      this.platforms = value.platforms;
    });
  }

  getPlatformChinaName(name: string): string {
    let platform = this.platforms.find((value) => {
      return value.Name === name;
    })
    if (platform) {
      return platform.ChinaName;
    }
    return name;
  }
}
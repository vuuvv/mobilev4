import { Component, OnInit } from '@angular/core';

import { Platform, StoreService } from '../shared';

@Component({
  templateUrl: './store-signup.component.html',
  styleUrls: ['./store-signup.component.less'],
})
export class StoreSignupComponent implements OnInit {
  platforms: Platform[];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.getVisiblePlatforms().subscribe((value: Platform[]) => {
      this.platforms = value;
    });
  }
}
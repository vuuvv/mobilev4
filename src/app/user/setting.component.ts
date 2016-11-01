import { Component, OnInit } from '@angular/core';

import { UserInfo, AuthorizeService } from '../shared';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
})
export class SettingComponent implements OnInit {
  user: UserInfo;

  constructor(private authorize: AuthorizeService) {
  }

  ngOnInit() {
    this.user = this.authorize.user.user;
  }
}
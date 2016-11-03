import { Component } from '@angular/core';

import { buildUrl, AuthorizeService } from '../shared';

@Component({
  templateUrl: './deposit.component.html',
})
export class DepositComponent {
  amount: number;

  constructor(private authService: AuthorizeService) {
  }

  submit() {
    var url = buildUrl('/weixin/pay', {
      usercode: this.authService.user.user.UserCode,
      amount: this.amount,
      url: buildUrl('/m2/#/account'),
    });

    window.location.href = url;
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params  } from '@angular/router';

import { buildUrl, AuthorizeService } from '../shared';

@Component({
  templateUrl: './deposit.component.html',
})
export class DepositComponent {
  amount: number;

  constructor(
    private authService: AuthorizeService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.amount = params['amount'];
    });
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
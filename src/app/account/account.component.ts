import { Component, OnInit } from '@angular/core';

import { Account, AccountService } from '../shared';

import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent implements OnInit {
  accounts: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.accountService.getAccounts().subscribe((value: Account[]) => {
      this.accounts = value;
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizeService, User } from '../shared';
import { DialogService } from '../../components';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private authorize: AuthorizeService,
    private router: Router,
    private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.authorize.user;
  }

  logout() {
    this.dialog.confirm('您要退出福建邮乐吗？', '退出').ok((comp) => {
      this.authorize.logout().subscribe(() => {
        this.router.navigate(['/home']);
        comp.close();
      });
    });
  }

  balance() {
    return this.user.account.reduce((a, c) => a + c.Balance, 0);
  }
}
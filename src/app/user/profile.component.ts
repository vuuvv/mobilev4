import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserInfo, AuthorizeService, Http } from '../shared';

import { OverlayService } from '../../components';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private user: UserInfo = new UserInfo();

  constructor(
    private router: Router,
    private overlayService: OverlayService,
    private authorizeService: AuthorizeService,
    private http: Http) {
  }

  ngOnInit() {
    this.user = this.authorizeService.user.user;
  }

  submit() {
    this.http.post('mo/profile/edit', {NickName: this.user.NickName}).concatMap(() => {
      return this.authorizeService.update();
    }).subscribe(() => {
      this.overlayService.toast();
      this.router.navigate(['/home/user/setting']);
    });
  }
}
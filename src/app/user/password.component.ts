import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Http } from '../shared';

import { OverlayService, DialogService } from '../../components';

@Component({
  templateUrl: './password.component.html',
})
export class PasswordComponent {
  private password: string;
  private confirm: string;

  constructor(
    private router: Router,
    private overlayService: OverlayService,
    private dialogService: DialogService,
    private http: Http) {
  }

  submit() {
    if (this.confirm !== this.password) {
      this.dialogService.alert("两次填写的密码不一样");
      return;
    }
    this.http.post('password_v2', {Password: this.password}).subscribe(() => {
      this.overlayService.toast();
      this.router.navigate(['/home/user/setting']);
    });
  }
}
import { Component, OnInit } from '@angular/core';

import { buildUrl, Http, Login, AuthorizeService } from '../shared';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  captcha: string;
  login: Login = new Login();

  constructor(private http: Http, private authorize: AuthorizeService) {
  }

  ngOnInit() {
    this.refreshCaptcha();
  }

  refreshCaptcha() {
    this.captcha = buildUrl('captcha/login', {
      width: 220,
      height: 80,
      length: 4,
    });
  }

  submit() {
    this.authorize.login(this.login).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        this.refreshCaptcha();
      }
    );
  }

  log(data) {
    console.log(data);
  }
}
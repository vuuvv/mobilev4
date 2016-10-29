import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Http } from './http';

import { User } from './models';

export class Login {
  username: string;
  password: string;
  captcha: string;
}

@Injectable()
export class AuthorizeService {
  isLoggedIn: boolean = false;
  redirectUrl: string;
  user: User;

  constructor(private http: Http, private router: Router) {
    console.log('authorize ctors');
  }

  private doLogin(user: User): User {
    this.isLoggedIn = true
    this.user = user;

    let redirect = this.redirectUrl ? this.redirectUrl : '/home/user';
    let navigationExtras: NavigationExtras = {
      preserveFragment: true,
      preserveQueryParams: true,
    };
    this.router.navigate([redirect], navigationExtras);

    return user;
  }

  login(data: Login): Observable<User> {
    return this.http.post<User>('mo/login', data, true).map((user: User) => this.doLogin(user));
  }

  logout(): Observable<any> {
    return this.http.get('mo/logout').map(() => {
      this.isLoggedIn = false;
      this.user = null;
    });
  }

  checkLogin(): Observable<boolean> {
    if (this.isLoggedIn) {
      return Observable.of(true);
    }
    return this.http.get<User>('mo/me', undefined, undefined, undefined, 'none').map((user: User) => {
      this.doLogin(user);
      return true;
    });
  }
}
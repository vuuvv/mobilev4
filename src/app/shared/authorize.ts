import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
  user: User;

  constructor(private http: Http) {
  }

  private setLogin(user: User): User {
    this.isLoggedIn = true
    this.user = user;
    return user;
  }

  login(data: Login): Observable<User> {
    return this.http.post<User>('mo/login', data, true).map((user: User) => this.setLogin(user));
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
  }

  checkLogin(): Observable<boolean> {
    if (this.isLoggedIn) {
      return Observable.of(true);
    }
    return this.http.get<User>('mo/me', undefined, undefined, undefined, 'none').map((user: User) => {
      this.setLogin(user);
      return true;
    });
  }
}
import { Injectable } from '@angular/core';

import { AuthorizeService } from './authorize';
import { Http } from './http';

import { Account } from '../models';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(
    private authorizeService: AuthorizeService,
    private http: Http) {
  }

  accountList(): Observable<Account[]> {
    return this.http.get<Account[]>('mo/balance');
  }

  balance(): Observable<number> {
    return this.accountList().map((value: Account[]) => {
      return value.reduce((a, b) => a + b.Balance , 0);
    })
  }
}
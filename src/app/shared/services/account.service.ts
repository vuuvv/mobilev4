import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Http } from './http';

import { Account } from '../models';

@Injectable()
export class AccountService {
  constructor(private http: Http) {
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('/mo/account');
  }
}

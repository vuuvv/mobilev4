import { Injectable } from '@angular/core';

import { Http } from './http';

@Injectable()
export class TestService {
  constructor(private http: Http) {
  }
}

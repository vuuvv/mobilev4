import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Http, buildUrl } from './http';

import { StoresInfo, Platform } from '../models';


@Injectable()
export class StoreService {
  constructor(private http: Http) {
  }

  getData(): Observable<StoresInfo> {
    return this.http.get<StoresInfo>('mo/stores');
  }

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>('/platforms');
  }

  getVisiblePlatforms(): Observable<Platform[]> {
    return this.getPlatforms().map((platforms: Platform[]) => {
      return platforms.filter((value: Platform) => value.Visible)
    });
  }

  getAuthorizeUrl(platform: string) :string {
    return buildUrl(`/mo/store/bind/${platform}`);
  }
}
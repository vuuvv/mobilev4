import { Injectable } from '@angular/core';
import { Http as RawHttp, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { DialogService } from '../../../components';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';

function fixUrl(url: string): string {
  const absoluteUrlPattern = new RegExp('^([a-z]+://|//)', 'i');
  let base = window['BASE_URL'];
  if (absoluteUrlPattern.test(url) || !base) {
    return url;
  }
  url = url.replace(/^\//, '');
  base = base.replace(/\/$/, '');
  return `${base}/${url}`;
}

export function buildQueryString(data: any) {
  if (!data)
    return '';
  return Object.keys(data).filter((value) => !!data[value]).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
}

export function buildUrl(url: string, data: any = null, noCache=true) {
  url = fixUrl(url);
  if (!data) {
    return url;
  }

  if (noCache) {
    data['_t'] = new Date().getTime();
  }

  let qs = buildQueryString(data);
  if (qs && url.indexOf('?') === -1) {
    url += '?';
  }

  return url + qs;
}

export class HttpError extends Error {
  code: string;

  constructor(resp: ApiResult<any>) {
    super();
    this.code = resp.error_code;
    this.message = `[${resp.error_code}]${resp.error_message || '错误'}`;
  }
}

export class PublickKey {
  pub: string;
}

export class EncryptParameter {
  e: string;
}

export class ApiResult<T> {
  success: boolean;
  value: T;
  error_code?: string;
  error_message?: string;
}

export type ErrorTipType = 'none' | 'dialog' | 'toast';

@Injectable()
export class Http {
  constructor(
    private http: RawHttp,
    private dialog: DialogService,
    private router: Router) {
  }

  private errorHandler(err: any, errorTip: ErrorTipType = 'dialog') {
    console.error(err);
    let msg = '';
    if (err instanceof HttpError) {
      if (err.code === '10004') {
        this.router.navigate(['/login']);
        return [];
      }
      msg = err.message;
    } else if (err.status === 0) {
      msg = '无法连接服务器';
    } else if (err.status === 401) {
      msg = '用户未授权';
    } else {
      msg = err.toString();
    }
    switch (errorTip) {
      case 'dialog':
      case 'toast':
        this.dialog.alert(msg, '错误');
        break;
      default:
        break;
    }
    throw err;
  }

  private resultHanlder<T>(res: Response) {
    let ret = res.json() as ApiResult<T>;
    if (!ret.success) {
      throw new HttpError(ret);
    }
    return ret.value;
  }

  private publickKey(data: any): Observable<EncryptParameter> {
    if (!data) {
      return Observable.of({e: ''});
    }
    return this._get<PublickKey>('pk').map(pk => {
        let plain = JSON.stringify(data);
        return { e: this.encrypt(plain, pk.pub) };
    });
  }

  private encrypt(plain: string, secret: string) {
    var parts = plain.match(/.{1,100}/g);
    var ret = [];

    var encrypt = new window['JSEncrypt']();
    encrypt.setPublicKey(secret);

    for (var i = 0; i < parts.length; i++) {
      ret.push(encrypt.encrypt(parts[i]));
    }
    return JSON.stringify(ret);
  }

  private _get<T>(url: string, data: any = null, noCache = true, errorTip: ErrorTipType = 'dialog'): Observable<T> {
    url = buildUrl(url, data, noCache);
    return this.http.get(url, {withCredentials: true}).map(res => this.resultHanlder(res)).catch(err => this.errorHandler(err, errorTip));
  }

  get<T>(url: string, data: any = null, noCache = true, encrypt = false, errorTip: ErrorTipType = 'dialog'): Observable<T> {
    return encrypt ?
      this.publickKey(data).concatMap(data => this._get(url, data, noCache, errorTip)) :
      this._get(url, data, noCache, errorTip);
  }

  private _post<T>(url: string, data: any, errorTip: ErrorTipType = 'dialog'): Observable<T> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let qs = buildQueryString(data);
    url = buildUrl(url, {}, false);
    return this.http.post(url, qs, options).map(res => this.resultHanlder(res)).catch(err => this.errorHandler(err, errorTip));
  }

  post<T>(url: string, data: any = null, encrypt = false, errorTip: ErrorTipType = 'dialog') {
    return encrypt ?
      this.publickKey(data).concatMap(data => this._post(url, data, errorTip)) :
      this._post(url, data, errorTip);
  }
}

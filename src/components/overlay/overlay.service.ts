import { Injectable, EventEmitter, Type } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

let OVERLAY_ID = 0;

export class OverlayConfig {
  id: number;
  componentType: Type<any>;
  data: any;
  instance?: any;
  needMask: boolean;
}

export class ToastConfig {
  show: boolean;
  duration: number;
  text?: string;
  icon?: string;
}

@Injectable()
export class OverlayService {
  private newEmitter: EventEmitter<OverlayConfig> = new EventEmitter<OverlayConfig>();
  private closeEmitter: EventEmitter<any> = new EventEmitter<any>();
  private instanceEmitter: EventEmitter<OverlayConfig> = new EventEmitter<OverlayConfig>();
  private toastEmitter: EventEmitter<ToastConfig> = new EventEmitter<ToastConfig>();

  getNewEvent(): Observable<OverlayConfig> {
    return this.newEmitter.asObservable();
  }

  getCloseEvent(): Observable<any> {
    return this.closeEmitter.asObservable();
  }

  getInstanceEvent(): Observable<any> {
    return this.instanceEmitter.asObservable();
  }

  getToastEvent(): Observable<ToastConfig> {
    return this.toastEmitter.asObservable();
  }

  create(component: Type<any>, data: any = null, needMask = true): Observable<OverlayConfig> {
    let id = ++OVERLAY_ID;
    this.newEmitter.next({
      id: id,
      componentType: component,
      data: data,
      needMask: needMask,
    });

    return this.instanceEmitter.asObservable().filter((value, index) => {
      return value.id === id;
    })
  }

  instance(config: OverlayConfig) {
    this.instanceEmitter.next(config);
  }

  close(componentInstance) {
    this.closeEmitter.next(componentInstance);
  }

  closeAll() {
    this.closeEmitter.next(null);
  }

  toast(text: string = '操作成功', icon: string = 'weui-icon-success-no-circle', duration: number = 1000) {
    this.toastEmitter.next({
      show: true,
      duration,
      text,
      icon,
    });
  }

  hideToast() {
    this.toastEmitter.next({
      show: false,
      duration: 0,
    })
  }

  loading(text: string = '数据加载中...') {
    this.toast(text, 'weui-loading', 0);
  }
}
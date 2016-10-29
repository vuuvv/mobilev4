import { Injectable, EventEmitter, Type } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

let OVERLAY_ID = 0;

export class OverlayConfig {
  id: number;
  componentType: Type<any>;
  data: any;
  instance?: any;
}

@Injectable()
export class OverlayService {
  private newEmitter: EventEmitter<OverlayConfig> = new EventEmitter<OverlayConfig>();
  private closeEmitter: EventEmitter<any> = new EventEmitter<any>();
  private instanceEmitter: EventEmitter<OverlayConfig> = new EventEmitter<OverlayConfig>();

  getNewEvent(): Observable<OverlayConfig> {
    return this.newEmitter.asObservable();
  }

  getCloseEvent(): Observable<any> {
    return this.closeEmitter.asObservable();
  }

  getInstanceEvent(): Observable<any> {
    return this.instanceEmitter.asObservable();
  }

  create(component: Type<any>, data: any = null): Observable<OverlayConfig> {
    let id = ++OVERLAY_ID;
    this.newEmitter.next({
      id: id,
      componentType: component,
      data: data,
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
}
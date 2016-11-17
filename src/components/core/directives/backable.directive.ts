import { Directive, EventEmitter, Injectable, Output, OnInit, OnDestroy } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';

import { Subscriber } from 'rxjs/Subscriber';
import { Observable }    from 'rxjs/Observable';

@Directive({
  selector: 'v-backable',
})
export class BackableDirective implements OnInit, OnDestroy {
  private subscriber: Subscriber<any>;
  @Output('back') onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.subscriber = <Subscriber<any>>this.location.subscribe((value:any) => {
      console.log(value);
      if (value && value['type'] == 'popstate') {
        this.onBack.emit();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
}

export interface Backable {
  canDeactive: (backable: Backable, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;
}

export class BackableComponent implements Backable {
  private states: string[] = [];

  get state(): string {
    let length = this.states.length;
    if (length) {
      return this.states[length - 1];
    }
    return "";
  }

  pushState(state: string) {
    console.log('push state:', state)
    this.states.push(state);
  }

  popState() {
    let stat = this.states.pop();
    console.log('pop state:', stat);
  }

  canDeactive(backable: Backable, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return false;
    // return !this.states.length;
  }
}

@Injectable()
export class BackableGuard implements CanDeactivate<Backable> {
  canDeactivate(backable: Backable, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return backable.canDeactive(backable, route, state);
  }
}
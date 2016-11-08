import { Directive, Input, Output, ElementRef, HostListener, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Directive({
  selector: '[v-debounce]',
})
export class DebounceInputDirective {
  @Input('delay') delay: number = 300;
  @Output('valueChanged') valueChanged: EventEmitter<string> = new EventEmitter<string>();


  private valueStream = new Subject<string>();

  constructor(private elementRef: ElementRef) {
    this.valueStream
      .throttleTime(this.delay)
      .distinctUntilChanged()
      .subscribe((value) => {
        console.log(value)
        this.valueChanged.next(value);
      })
  }

  @HostListener('keyup')
  onKeyUp() {
    console.log('keyup');
    this.valueStream.next(this.elementRef.nativeElement.value);
  }
}
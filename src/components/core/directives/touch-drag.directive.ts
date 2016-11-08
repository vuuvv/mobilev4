import { Directive, HostBinding, ViewContainerRef, OnInit, AfterViewInit, Input, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[v-touch-drag]',
  exportAs: 'touchDrag',
  host: {
    '[style.-webkit-transform]': 'translate3d()',
    '[style.transform]': 'translate3d()',
    '[style.-webkit-transition]': 'transition',
    '[style.transition]': 'transition',
    '(panstart)': 'moveStart($event)',
    '(panend)':'moveEnd($event)',
    '(pancancel)':'moveCancel',
    '(panleft)':'move($event)',
    '(panright)':'move($event)',
    '(panup)':'move($event)',
    '(pandown)':'move($event)',
    '(swipeleft)': 'moveX(-200, true)',
    '(swiperight)': 'moveX(200, true)',
    '(swipeup)': 'moveX(-600, true)',
    '(swipedown)': 'moveX(600, true)',
  }
})
export class TouchDragDirective implements OnInit, AfterViewInit, AfterContentInit {
  private startPosition: number = 0;
  private moving: boolean = false;
  private position: number = 0;
  private width: number = 0;
  private parentWidth: number = 0;
  private inTransition: boolean = false;
  @Input('direction') direction = 'horizontal';

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    console.log('OnInit')
  }

  ngAfterViewInit() {
    console.log('AfterViewInit')
  }

  ngAfterContentInit() {
    console.log('AfterContentInit')
  }

  get length(): number {
    let element = this.viewContainerRef.element.nativeElement;
    if (this.isHorizontal) {
      let length = 0;
      for (let e of element.children) {
        length += e.offsetWidth;
      }
      return length + 10;
    } else {
      return element.offsetHeight;
    }
  }

  get parentLength(): number {
    let parent = this.viewContainerRef.element.nativeElement.parentElement;
    if (this.isHorizontal) {
      return parent.offsetWidth;
    } else {
      return parent.offsetHeight;
    }
  }

  // ngAfterViewInit() {
  //   if (this.direction === 'horizontal') {
  //     setTimeout(() => {
  //       let width = 0;
  //       let element = this.viewContainerRef.element.nativeElement;
  //       for (let e of element.children) {
  //         width += e.offsetWidth;
  //       }
  //       this.width = width + 10;
  //       this.parentWidth = element.parentElement.offsetWidth;
  //     }, 100);
  //   } else {
  //     setTimeout(() => {
  //       let element = this.viewContainerRef.element.nativeElement;
  //       this.width = element.offsetHeight;
  //       this.parentWidth = element.parentElement.offsetHeight;
  //     }, 100);
  //   }
  // }

  get isHorizontal() {
    return this.direction === 'horizontal';
  }

  get transition() {
    return this.inTransition ? 'all .3s' : 'all 0s';
  }

  translate3d(): string {
    if (this.isHorizontal) {
      return `translate3d(${this.position}px, 0px, 0px)`;
    } else {
      return `translate3d(0px, ${this.position}px, 0px)`;
    }
  }

  moveStart() {
    this.inTransition = false;
    this.moving = true;
    this.startPosition = this.position;
  }

  moveEnd(event) {
    this.moving = false;
    let left = false;
    if (this.startPosition > this.position) {
      left = true;
    }
    this.startPosition = this.position;
  }

  moveCancel() {
    this.position = this.startPosition;
  }

  move(event) {
    if (this.moving) {
      if (this.isHorizontal) {
        this.moveX(event.deltaX);
      } else {
        this.moveX(event.deltaY);
      }
    }
  }

  reset() {
    this.position = 0;
  }

  moveX(delta: number, transition: boolean = false) {
    this.inTransition = transition;
    let p = this.startPosition + delta;
    let lenght = this.length;
    if (p > 0 || this.length < this.parentLength) {
      p = 0;
    } else if (-p > this.length - this.parentLength) {
      p = -(this.length - this.parentLength)
    }
    this.position = p;
  }
}
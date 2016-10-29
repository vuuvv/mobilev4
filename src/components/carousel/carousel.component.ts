import {
  Component,
  Input,
  ViewContainerRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';

export class CarouselConfig {
  sliders: string[];
  transition?: string;
  showIndicator: true;
}

const noTransition = 'transform 0ms';
const defaultTransition = 'transform 500ms cubic-bezier(0, 0, 0.5, 1)';

@Component({
  selector: 'v-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['carousel.component.less'],
  host: {
    '[style.display]': '"block"',
    '[style.height]': 'height',
  }
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input('config') config: CarouselConfig;
  @Input('height') height: string = '130px';
  @Input('duration') duration: number = 4000;

  private startPosition: number = 0;
  private moving: boolean = false;
  private timer: NodeJS.Timer = null;

  position: number = 0;

  transition: string = noTransition;
  inTransition: boolean = false;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.restartTimer();
  }

  ngOnDestroy() {
    this.resetTimer();
  }

  backgroundUrl(url): string {
    return `url(${url})`;
  }

  translate3d(x = 0, y = 0, z = 0): string {
    return `translate3d(${x}px,${y}px,${z}px)`;
  }

  private getIndexOfPosition(position: number): number {
    return parseInt(-position/this.elWidth + '');
  }

  get index(): number {
    return this.getIndexOfPosition(this.position);
  }

  get count(): number {
    return this.config.sliders.length;
  }

  get elWidth(): number {
    return this.viewContainerRef.element.nativeElement.offsetWidth;
  }

  get containerWidth(): number {
    let config = this.config;
    if (config && config.sliders && config.sliders.length) {
      return config.sliders.length * this.elWidth;
    }
    return 0;
  }

  private restartTimer() {
    if (this.moving) {
      return;
    }
    this.resetTimer();
    this.timer = setInterval(() => {
      this.next(true);
    }, this.duration);
  }

  private resetTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  moveStart() {
    this.resetTimer();
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
    if (left) {
      this.go(this.index + 1);
    } else {
      this.go(this.index);
    }
    this.restartTimer();
  }

  moveCancel() {
    this.position = this.startPosition;
  }

  move(event) {
    if (this.moving) {
      let target = this.startPosition + event.deltaX;
      if (target < 0 && -target < this.containerWidth - this.elWidth) {
        this.position = target;
      }
    }
  }

  go(n) {
    if (n < 0) {
      n = 0;
    }
    if (n >= this.count) {
      n = this.count - 1;
    }
    this.position = -n * this.elWidth;
    // this.transition = this.config.transition || defaultTransition;
    this.inTransition = true;
  }

  next(repeat:boolean = false) {
    let n = this.index + 1;
    if (repeat && n >= this.count) {
      n = 0;
    }
    this.go(n);
  }

  prev() {
    this.go(this.index - 1);
  }

  @HostListener('click')
  onClick() {
    this.go(0);
  }
}
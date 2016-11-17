import { Directive, Component, Input, ViewEncapsulation, HostListener, HostBinding, OnInit, AfterViewInit, OnDestroy, Type } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'v-page',
  templateUrl: './page.html',
  styleUrls: ['./style.less', './page.less'],
  encapsulation: ViewEncapsulation.None,
})
export class Page {
}

@Component({
  selector: 'v-page v-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./content.less'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.page-content]': 'true',
    '[class.slide-transition]': 'true',
    '[class.slide-enter]': 'sliderEnter',
    '[class.slide-leave]': 'sliderLeave',
  },
})
export class PageContent implements OnInit, AfterViewInit, OnDestroy {
  sliderEnter: boolean = true;
  sliderLeave: boolean = false;
  ngOnInit() {
    this.sliderEnter = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sliderEnter = false;
    }, 0)
  }

  ngOnDestroy() {
    this.sliderLeave = true;
  }
}

@Component({
  selector: 'v-page v-header',
  templateUrl: './header.html',
  styleUrls: ['./header.less'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeader {
  @Input('title') title: string;
}

@Directive({
  selector: 'v-page v-header v-title'
})
export class PageHeaderTitle {}

export type PageHeaderButtonType = '' | 'right' | 'left';

@Component({
  selector: 'v-page v-header v-btn',
  templateUrl: 'header-button.html',
  styleUrls: ['./header-button.less'],
  host: {
    '[class.button]': 'true',
    '[class.button-link]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderButton {
  @Input('icon') icon: string;
  @Input('image') image: string;
  @Input('label') label: string;
  @Input('type') type: PageHeaderButtonType = 'left';

  setIconClasses() {
    let classes = {
      iconfont: this.icon,
    }
    if (this.icon) {
      classes[`icon-${this.icon}`] = true;
    }

    return classes;
  }
}


@Component({
  selector: 'v-page v-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.less'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.weui-tabbar]': 'true',
  },
})
export class PageFooter {}

@Component({
  selector: 'v-page v-footer v-item',
  templateUrl: './footer-item.html',
  host: {
    '[class.weui-tabbar__item]': 'true'
  },
})
export class PageFooterItem {
  @Input('icon') icon: string;
  @Input('image') _image: string;
  @Input('label') label: string;
  @Input('badge') _badge: Observable<string> | string;

  setIconClasses() {
    let classes = {
      iconfont: this.icon,
    }
    if (this.icon) {
      classes[`icon-${this.icon}`] = true;
    }

    return classes;
  }

  get image():string {
    if (this._image) {
      return `url(${this._image})`;
    } else {
      return null;
    }
  }

  get badge(): Observable<string> {
    if (typeof this._badge === "string") {
      return Observable.of(this._badge);
    } else {
      return this._badge;
    }
  }
}

@Directive({
  selector: 'v-page v-footer v-button',
  host: {
    '[style.width]': 'width',
    '[style.background]': 'background',
    '[style.color]': 'color',
  }
})
export class PageFooterButtonDirective {
  @Input('width') width: string = '50%';
  @Input('background') _background: string = '#f23030';
  @Input('color') color: string = '#fff';

  get background() {
    switch(this._background) {
      case 'yellow':
        return '#ffb03f';
      case 'grey':
      case 'gray':
        return '#999';
      default:
        // red
        return '#f23030';
    }
  }
}

@Directive({
  selector: '[v-back]',
})
export class HistoryBackDirective {
  constructor(private location: Location) {
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}

@Directive({
  selector: '[v-home]',
})
export class HomeDirective {
  constructor(private router: Router) {
  }
  @HostListener('click')
  onClick() {
    this.router.navigate(['/']);
  }
}

@Component({
  selector: 'v-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.less'],
})
export class EmptyPageComponent {
  @Input('title') title: string;
}

export const PAGE_COMPONENTS: Type<any>[] = [
  Page,
  PageFooter,
  PageFooterItem,
  PageFooterButtonDirective,
  PageHeader,
  PageHeaderTitle,
  PageHeaderButton,
  PageContent,
  HistoryBackDirective,
  HomeDirective,
  EmptyPageComponent,
]

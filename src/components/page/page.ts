import { Directive, Component, Input, ViewEncapsulation, HostListener, HostBinding, OnInit, Type } from '@angular/core';

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
export class Page {}

@Component({
  selector: 'v-page v-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./content.less'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.page-content]': 'true',
  },
})
export class PageContent {}

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
  host: {
    '[class.weui-tabbar]': 'true',
  },
})
export class PageFooter {}

@Component({
  selector: 'v-page v-footer v-item',
  templateUrl: './footer-item.html',
  styleUrls: ['./footer.less'],
  host: {
    '[class.weui-tabbar__item]': 'true'
  },
  encapsulation: ViewEncapsulation.None,
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

export const PAGE_COMPONENTS: Type<any>[] = [
  Page,
  PageFooter,
  PageFooterItem,
  PageHeader,
  PageHeaderTitle,
  PageHeaderButton,
  PageContent,
  HistoryBackDirective,
  HomeDirective,
]

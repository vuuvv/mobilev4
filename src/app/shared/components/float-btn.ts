import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-float-btn',
  templateUrl: './float-btn.html',
  styleUrls: ['./float-btn.less'],
})
export class FloatButtonComponent {
  @Input('icon') icon: string;

  get iconClass() {
    return `iconfont icon-${this.icon}`;
  }
}
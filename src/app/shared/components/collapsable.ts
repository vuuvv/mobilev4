import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-collapsable',
  templateUrl: './collapsable.html',
  styleUrls: ['./collapsable.less'],
})
export class CollapsableComponent {
  @Input('collapsed') collapsed: boolean = false;
  @Input('hasContent') hasContent: boolean = true;
  @Input('title') title: string;

  get iconClass() {
    let icon = this.collapsed ? 'down' : 'up'
    return `iconfont icon-${icon}`;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
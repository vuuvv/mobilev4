import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-gotop',
  templateUrl: './gotop.html',
  styleUrls: ['./gotop.less'],
})
export class GotopComponent {
  @Input('bottom') bottom: string = "68px";
}

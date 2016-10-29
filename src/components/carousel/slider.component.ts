import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['slider.component.less'],
})
export class SliderComponent {
  @Input('config') config: string;
}
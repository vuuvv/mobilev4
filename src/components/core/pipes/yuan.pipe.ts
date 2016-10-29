import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yuan',
})
export class YuanPipe {
  transform(value: number | string) {
    return `¥${value}`;
  }
}
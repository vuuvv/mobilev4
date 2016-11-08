import { Type } from '@angular/core';
import { TouchDragDirective } from './touch-drag.directive';
import { DebounceInputDirective } from './debounce.directive';

export const CORE_DIRECTIVES: Type<any>[] = [
  DebounceInputDirective,
  TouchDragDirective,
];
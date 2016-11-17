import { Type } from '@angular/core';
import { TouchDragDirective } from './touch-drag.directive';
import { DebounceInputDirective } from './debounce.directive';
import { BackableDirective } from './backable.directive';

export const CORE_DIRECTIVES: Type<any>[] = [
  DebounceInputDirective,
  TouchDragDirective,
  BackableDirective,
];
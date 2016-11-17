import { Type } from '@angular/core';
import { ComponentBuilder } from './component.builder';
import { BackableGuard } from '../directives/backable.directive';

export const CORE_SERVICES: Type<any>[] = [
  ComponentBuilder,
  BackableGuard,
];
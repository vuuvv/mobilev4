import { NgModule, ModuleWithProviders } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { CORE_PIPES } from './pipes';
import { CORE_SERVICES } from './services';
import { CORE_DIRECTIVES } from './directives';

@NgModule({
  declarations: [
    CORE_PIPES,
    CORE_DIRECTIVES,
  ],
  exports: [
    CORE_PIPES,
    CORE_DIRECTIVES,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [CORE_SERVICES, COMPILER_PROVIDERS],
    }
  }
}
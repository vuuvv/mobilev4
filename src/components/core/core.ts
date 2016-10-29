import { NgModule, ModuleWithProviders } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { CORE_PIPES } from './pipes';
import { CORE_SERVICES } from './services';

@NgModule({
  declarations: [
    CORE_PIPES,
  ],
  exports: [
    CORE_PIPES,
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
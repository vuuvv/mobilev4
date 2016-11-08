import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Http as RawHttp } from '@angular/http';

import { DialogModule, CoreModule } from '../../components';

import { Http, AuthorizeGuard, AuthorizeService, StoreService, AccountService, ProductService } from './services';

import { CORE_COMPONENTS } from './components';

@NgModule({
  imports: [
    CoreModule,
  ],
  declarations: [
    CORE_COMPONENTS,
  ],
  exports: [
    CORE_COMPONENTS,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [Http, AuthorizeService, AuthorizeGuard, StoreService, AccountService, ProductService],
    }
  }
}
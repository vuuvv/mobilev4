import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Http as RawHttp } from '@angular/http';

import { DialogModule } from '../../components';

import { Http, AuthorizeGuard, AuthorizeService, StoreService, AccountService } from './services';

@NgModule({
  imports: [
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [Http, AuthorizeService, AuthorizeGuard, StoreService, AccountService],
    }
  }
}
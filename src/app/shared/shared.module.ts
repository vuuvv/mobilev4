import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Http as RawHttp } from '@angular/http';

import { DialogModule } from '../../components';

import { Http } from './http';
import { AuthorizeService } from './authorize';
import { AuthorizeGuard } from './auth-guard';

@NgModule({
  imports: [
    DialogModule,
    RouterModule,
  ],
  providers: [
    Http,
    AuthorizeService,
    AuthorizeGuard,
  ]
})
export class SharedModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OverlayModule, PageModule, DialogModule } from '../../components';

import { LoginComponent } from './login.component';
import { routing } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    OverlayModule,
    PageModule,
    DialogModule,

    routing,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule {}
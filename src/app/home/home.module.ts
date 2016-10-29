import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { OverlayModule, PageModule, DialogModule, CarouselModule, CoreModule } from '../../components';

import { SharedModule } from '../shared';

import { UserModule } from '../user';

import { NotifyModule } from '../notify';

import { HomeLayoutComponent, HomeComponent } from './home.component';

import { homeRouting } from './home.routing';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    CoreModule,
    OverlayModule,
    PageModule,
    DialogModule,
    CarouselModule,
    SharedModule,

    UserModule,
    NotifyModule,

    homeRouting,
  ]
})
export class HomeModule {}
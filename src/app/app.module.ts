import { BrowserModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CoreModule, OverlayModule, DialogModule, PageModule, CarouselModule } from '../components';

import { HomeModule } from './home';
import { ProductModule } from './product';
import { OrderModule } from './order';
import { LoginModule } from './login';
import { StoreModule } from './store';
import { AccountModule } from './account';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': { direction: window["Hammer"].DIRECTION_ALL },
      'pan': { direction: window["Hammer"].DIRECTION_ALL },
      'pinch': { enable: false },
      'rotate': { enable: false},
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    routing,

    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,

    SharedModule.forRoot(),

    HomeModule,
    ProductModule,
    OrderModule,
    LoginModule,
    StoreModule,
    AccountModule,

    CoreModule.forRoot(),
    OverlayModule.forRoot(),
    PageModule,
    DialogModule.forRoot(),
    CarouselModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

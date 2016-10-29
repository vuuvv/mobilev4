import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CoreModule, OverlayModule, DialogModule, PageModule, CarouselModule } from '../components';

import { HomeModule } from './home';
import { ProductModule } from './product';
import { LoginModule } from './login';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

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
    LoginModule,

    CoreModule.forRoot(),
    OverlayModule.forRoot(),
    PageModule,
    DialogModule.forRoot(),
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

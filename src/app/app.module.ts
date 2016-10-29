import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { OverlayModule, DialogModule, PageModule } from '../components';

import { HomeModule } from './home';
import { ProductModule } from './product';
import { LoginModule } from './login';

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

    HomeModule,
    ProductModule,
    LoginModule,

    OverlayModule,
    PageModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

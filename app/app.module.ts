import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApiConnectionService} from './api-connection.service';
import { Page1Component } from './page1/page1.component';
import { HttpClientModule } from '@angular/common/http';
import {data } from '../app/data'


@NgModule({
  declarations: [
    AppComponent,
    Page1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiConnectionService,data],
  bootstrap: [AppComponent]
})
export class AppModule { }

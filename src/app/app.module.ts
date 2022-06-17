import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from './ui-kit/toastr/toastr.module';
import { SpinnerModule } from './ui-kit/spinner/spinner.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    ToastrModule,
    SpinnerModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    // {provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

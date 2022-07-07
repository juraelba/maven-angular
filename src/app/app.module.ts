import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';

import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from './ui-kit/toastr/toastr.module';
import { SpinnerModule } from './ui-kit/spinner/spinner.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { SideNavService } from './core/services/side-nav.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    ToastrModule,
    SpinnerModule,
    HomeModule
  ],
  providers: [
    MultilevelMenuService,
    SideNavService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

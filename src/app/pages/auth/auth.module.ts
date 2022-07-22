import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings,
} from 'ng-recaptcha';
import { RECAPTCHA_KEY } from '../../core/data/constants';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatModule } from 'src/app/mat/mat.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordEmailComponent } from './forgot-password/forgot-password-email/forgot-password-email.component';
import { ForgotPasswordCodeComponent } from './forgot-password/forgot-password-code/forgot-password-code.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TermsComponent } from './terms/terms.component';
import { AutoFocusDirective } from '../../core/directives/auto-focus/auto-focus.directive';

const globalSettings: RecaptchaSettings = { siteKey: RECAPTCHA_KEY };

@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    ForgotPasswordEmailComponent,
    ForgotPasswordCodeComponent,
    ChangePasswordComponent,
    TermsComponent,
    AutoFocusDirective
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    RecaptchaModule
  ],
  exports: [
    LoginComponent,
    CreateAccountComponent,
    TermsComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    },
  ],
})
export class AuthModule { }

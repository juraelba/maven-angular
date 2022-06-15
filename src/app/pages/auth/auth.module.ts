import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatModule } from 'src/app/mat/mat.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordEmailComponent } from './forgot-password/forgot-password-email/forgot-password-email.component';
import { ForgotPasswordCodeComponent } from './forgot-password/forgot-password-code/forgot-password-code.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    ForgotPasswordEmailComponent,
    ForgotPasswordCodeComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule
  ],
  exports: [
    LoginComponent,
    CreateAccountComponent
  ]
})
export class AuthModule { }

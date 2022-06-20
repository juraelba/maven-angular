import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { SpinnerService } from '../../../core/services/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
  }

  async login() {
    try {
      this.spinnerService.show();
      const value = this.form.value;
      await lastValueFrom(this.authService.login(value.email, value.password));
      this.router.navigate(['/']);
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }
}

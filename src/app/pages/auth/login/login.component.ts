import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { TokenResponse } from '../../../core/models/auth.model';
import { MAX_VALIDATION_TRIES } from '../../../core/data/constants';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  checkPendingUser: boolean = false;
  invalidMessage: string;
  attempts: number = 0;
  MAX_TRIES: number = MAX_VALIDATION_TRIES;
  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });
  codeForm: UntypedFormGroup = this.fb.group({
    code: ['', Validators.required],
  });
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinnerService: SpinnerService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  async login() {
    try {
      this.spinnerService.show();
      const value = this.form.value;
      this.authService.login(value.email, value.password).pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe((res: TokenResponse) => {
        if (res.status === 'valid') {
          this.localStorage.set('listsCachingTime', DateTime.now().toISO());

          this.router.navigate(['/media-search']);
          this.invalidMessage = '';
        } else if (res.status === 'pending') {
          this.checkPendingUser = true;
          this.invalidMessage = '';
        } else if (res.status === 'review') {
          this.invalidMessage = 'There was a problem with your registration. Please contact us at info@mediaframework.com or 201-801-5228 to complete your registration.';
        } else {
          this.toastr.danger('Invalid Login');
          this.invalidMessage = '';
        }
      });
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  async verificationCodeSubmit() {
    try {
      this.spinnerService.show();
      this.authService.codeCheckWithEmail(this.form.value.email, this.codeForm.value.code).pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(res => {
        if (res == '') {
          this.attempts++;
          if (this.attempts < this.MAX_TRIES) {
            this.invalidMessage = "Invalid Code. Please try again.";
          } else {
            this.toastr.danger("You have attempted to enter the code too many times. The code found in the email is no longer valid.");
          }
        } else {
          this.authService.checkCreateAccountValidate(res).pipe(
            takeUntil(this.unsubscribeAll)
          ).subscribe(valid => {
            if (valid) {
              this.authService.login(this.form.value.email, this.form.value.password).pipe(
                takeUntil(this.unsubscribeAll)
              ).subscribe((res: TokenResponse) => {
                this.router.navigate(['/media-search']);
              });
            } else {
              this.invalidMessage = "Invalid Code. Please try again.";
            }
          })
        }
      });
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  async verificationCodeSendAgain() {
    try {
      this.spinnerService.show();
      this.invalidMessage = "";
      this.authService.sendCreateAccountCode(this.form.value.email).pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(res => {
        if (typeof res === 'string' && res == 'message sent') {
          this.attempts = 0;
          this.toastr.success('Another code has been sent to ' + this.form.value.email + '. Check your spam folder. It may be hiding in there.');
        }
      });
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CustomValidator, PasswordNumberValidator, PasswordUpperValidator } from '../../../core/utils/validators.util';
import { User } from '../../../core/models/auth.model';
import { MAX_VALIDATION_TRIES } from '../../../core/data/constants';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  sentFormData: boolean = false;
  user = {} as User;
  attempts: number = 0;
  MAX_TRIES: number = MAX_VALIDATION_TRIES;
  invalidMessage: string = "";
  accountValidated: boolean = false;
  checkReCaptcha: boolean = false;
  dataForm: UntypedFormGroup = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [
        this.customValidator.existingEmailValidator(),
        this.customValidator.domainValidator()
      ]
    }],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      PasswordNumberValidator(),
      PasswordUpperValidator()
    ]],
    name: ['', Validators.required],
    title: [''],
    office: ['', Validators.required],
    phone: ['', Validators.required],
    terms: ['', Validators.required],
  });
  codeForm: UntypedFormGroup = this.fb.group({
    code: ['', Validators.required],
  });

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinnerService: SpinnerService,
    private customValidator: CustomValidator,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  async signupFormSubmit() {
    try {
      this.spinnerService.show();
      this.packObject();
      this.authService.sendCreateAccountFormData(this.user).pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(res => {
        if (typeof res === 'string') this.toastr.danger(res);
        else if (typeof res === 'object' && res.id > 0) {
          this.sentFormData = true;
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
      this.authService.checkCreateAccountCode(this.user.email, this.codeForm.value.code).pipe(
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
              this.toastr.success("Your account has been validated");
              this.accountValidated = true;
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
      this.authService.sendCreateAccountCode(this.user.email).pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(res => {
        if (typeof res === 'string' && res == 'message sent') {
          this.toastr.success('Another code has been sent to ' + this.user.email + '. Check your spam folder. It may be hiding in there.');
        }
      });
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  async recaptchaResolved(captchaResponse: string) {
    try {
      this.spinnerService.show();
      if (captchaResponse) {
        this.authService.recaptchaValidate(captchaResponse).pipe(
          takeUntil(this.unsubscribeAll)
        ).subscribe((res: any) => {
          this.checkReCaptcha = res.success;
        });
      } else {
        this.checkReCaptcha = false;
      }
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  async redirectToLogin() {
    this.router.navigate(['/login']);
  }

  private packObject() {
    this.user.email = this.dataForm.value.email;
    this.user.password = this.dataForm.value.password;
    this.user.name = this.dataForm.value.name;
    this.user.title = this.dataForm.value.title;
    this.user.office = this.dataForm.value.office;
    this.user.phone = this.dataForm.value.phone;
  }
}

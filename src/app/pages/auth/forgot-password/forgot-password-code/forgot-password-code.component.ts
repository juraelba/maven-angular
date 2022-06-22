import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { MAX_VALIDATION_TRIES } from 'src/app/core/data/constants';

@Component({
  selector: 'app-forgot-password-code',
  templateUrl: './forgot-password-code.component.html',
  styleUrls: ['./forgot-password-code.component.scss']
})
export class ForgotPasswordCodeComponent implements OnInit, OnDestroy {
  @Input() email: string;
  form: UntypedFormGroup;
  attempts: number = 0;
  MAX_TRIES: number = MAX_VALIDATION_TRIES;
  descriptionMessage: string;

  codeFormControl = new FormControl('', {
    validators: [Validators.required]
  });

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: this.codeFormControl
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  async onCodeSubmit() {
    try {
      this.spinnerService.show();
      this.descriptionMessage = '';
      if (this.codeFormControl.value) {
        this.authService.codeCheckWithEmail(this.email, this.codeFormControl.value).pipe(
          takeUntil(this.unsubscribeAll)
        ).subscribe(res => {
          if (res == '') {
            this.attempts++;
            if (this.attempts < this.MAX_TRIES) {
              this.toastr.danger("Invalid Code. Please try again.");
            } else {
              this.toastr.danger("You have attempted to enter the code too many times. The code found in the email is no longer valid.");
            }
          } else {
            this.toastr.success("You can change the password");
            this.router.navigate(['/change-password', { token: res }]);
          }
        });
      }
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  async verificationCodeSendAgain() {
    try {
      this.spinnerService.show();
      this.authService.sendForgotPasswordCode(this.email).pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(res => {
        if (typeof res === 'string' && res == 'message sent') {
          this.descriptionMessage = 'Another code has been sent to' + this.email + '. Check your spam folder. It may be hiding in there.';
        } else if (typeof res === 'string') {
          this.toastr.danger(res);
        }
      });
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }
}

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { lastValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { NextStepData } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss'],
})
export class ForgotPasswordEmailComponent implements OnInit, OnDestroy {
  @Output() onSendEmail = new EventEmitter<NextStepData>();
  form: UntypedFormGroup;
  emailFormControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
  });

  private unsubscribeAll: Subject<null> = new Subject<null>();

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.emailFormControl,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  async onEmailSubmit() {
    try {
      this.spinnerService.show();
      if (this.emailFormControl.value) {
        this.authService
          .sendForgotPasswordCode(this.emailFormControl.value)
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((res) => {
            if (typeof res === 'string' && res == 'message sent') {
              this.onSendEmail.emit(
                new NextStepData(
                  true,
                  this.emailFormControl.value ? this.emailFormControl.value : ''
                )
              );
            } else if (typeof res === 'string') {
              this.toastr.danger(res);
            }
          });
      }
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }
}
